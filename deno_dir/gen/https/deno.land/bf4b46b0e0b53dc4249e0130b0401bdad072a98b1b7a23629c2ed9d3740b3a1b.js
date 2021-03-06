import { getLevelByName, LogLevels } from "./levels.ts";
import { blue, bold, red, yellow } from "../fmt/colors.ts";
import { exists, existsSync } from "../fs/exists.ts";
import { BufWriterSync } from "../io/bufio.ts";
const DEFAULT_FORMATTER = "{levelName} {msg}";
export class BaseHandler {
    level;
    levelName;
    formatter;
    constructor(levelName, options = {}) {
        this.level = getLevelByName(levelName);
        this.levelName = levelName;
        this.formatter = options.formatter || DEFAULT_FORMATTER;
    }
    handle(logRecord) {
        if (this.level > logRecord.level)
            return;
        const msg = this.format(logRecord);
        return this.log(msg);
    }
    format(logRecord) {
        if (this.formatter instanceof Function) {
            return this.formatter(logRecord);
        }
        return this.formatter.replace(/{(\S+)}/g, (match, p1) => {
            const value = logRecord[p1];
            if (value == null) {
                return match;
            }
            return String(value);
        });
    }
    log(_msg) { }
    async setup() { }
    async destroy() { }
}
export class ConsoleHandler extends BaseHandler {
    format(logRecord) {
        let msg = super.format(logRecord);
        switch (logRecord.level) {
            case LogLevels.INFO:
                msg = blue(msg);
                break;
            case LogLevels.WARNING:
                msg = yellow(msg);
                break;
            case LogLevels.ERROR:
                msg = red(msg);
                break;
            case LogLevels.CRITICAL:
                msg = bold(red(msg));
                break;
            default:
                break;
        }
        return msg;
    }
    log(msg) {
        console.log(msg);
    }
}
export class WriterHandler extends BaseHandler {
    _writer;
    #encoder = new TextEncoder();
}
export class FileHandler extends WriterHandler {
    _file;
    _buf;
    _filename;
    _mode;
    _openOptions;
    _encoder = new TextEncoder();
    #unloadCallback = () => this.destroy();
    constructor(levelName, options) {
        super(levelName, options);
        this._filename = options.filename;
        this._mode = options.mode ? options.mode : "a";
        this._openOptions = {
            createNew: this._mode === "x",
            create: this._mode !== "x",
            append: this._mode === "a",
            truncate: this._mode !== "a",
            write: true,
        };
    }
    async setup() {
        this._file = await Deno.open(this._filename, this._openOptions);
        this._writer = this._file;
        this._buf = new BufWriterSync(this._file);
        addEventListener("unload", this.#unloadCallback);
    }
    handle(logRecord) {
        super.handle(logRecord);
        if (logRecord.level > LogLevels.ERROR) {
            this.flush();
        }
    }
    log(msg) {
        this._buf.writeSync(this._encoder.encode(msg + "\n"));
    }
    flush() {
        if (this._buf?.buffered() > 0) {
            this._buf.flush();
        }
    }
    destroy() {
        this.flush();
        this._file?.close();
        this._file = undefined;
        removeEventListener("unload", this.#unloadCallback);
        return Promise.resolve();
    }
}
export class RotatingFileHandler extends FileHandler {
    #maxBytes;
    #maxBackupCount;
    #currentFileSize = 0;
    constructor(levelName, options) {
        super(levelName, options);
        this.#maxBytes = options.maxBytes;
        this.#maxBackupCount = options.maxBackupCount;
    }
    async setup() {
        if (this.#maxBytes < 1) {
            this.destroy();
            throw new Error("maxBytes cannot be less than 1");
        }
        if (this.#maxBackupCount < 1) {
            this.destroy();
            throw new Error("maxBackupCount cannot be less than 1");
        }
        await super.setup();
        if (this._mode === "w") {
            for (let i = 1; i <= this.#maxBackupCount; i++) {
                if (await exists(this._filename + "." + i)) {
                    await Deno.remove(this._filename + "." + i);
                }
            }
        }
        else if (this._mode === "x") {
            for (let i = 1; i <= this.#maxBackupCount; i++) {
                if (await exists(this._filename + "." + i)) {
                    this.destroy();
                    throw new Deno.errors.AlreadyExists("Backup log file " + this._filename + "." + i + " already exists");
                }
            }
        }
        else {
            this.#currentFileSize = (await Deno.stat(this._filename)).size;
        }
    }
    log(msg) {
        const msgByteLength = this._encoder.encode(msg).byteLength + 1;
        if (this.#currentFileSize + msgByteLength > this.#maxBytes) {
            this.rotateLogFiles();
            this.#currentFileSize = 0;
        }
        this._buf.writeSync(this._encoder.encode(msg + "\n"));
        this.#currentFileSize += msgByteLength;
    }
    rotateLogFiles() {
        this._buf.flush();
        Deno.close(this._file.rid);
        for (let i = this.#maxBackupCount - 1; i >= 0; i--) {
            const source = this._filename + (i === 0 ? "" : "." + i);
            const dest = this._filename + "." + (i + 1);
            if (existsSync(source)) {
                Deno.renameSync(source, dest);
            }
        }
        this._file = Deno.openSync(this._filename, this._openOptions);
        this._writer = this._file;
        this._buf = new BufWriterSync(this._file);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoYW5kbGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsY0FBYyxFQUFhLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVuRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDM0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsTUFBTSxpQkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztBQVE5QyxNQUFNLE9BQU8sV0FBVztJQUN0QixLQUFLLENBQVM7SUFDZCxTQUFTLENBQVk7SUFDckIsU0FBUyxDQUE2QjtJQUV0QyxZQUFZLFNBQW9CLEVBQUUsVUFBMEIsRUFBRTtRQUM1RCxJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUUzQixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksaUJBQWlCLENBQUM7SUFDMUQsQ0FBQztJQUVELE1BQU0sQ0FBQyxTQUFvQjtRQUN6QixJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBRXpDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxNQUFNLENBQUMsU0FBb0I7UUFDekIsSUFBSSxJQUFJLENBQUMsU0FBUyxZQUFZLFFBQVEsRUFBRTtZQUN0QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxD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