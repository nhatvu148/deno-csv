const QUOTE = '"';
export const NEWLINE = "\r\n";
export class StringifyError extends Error {
    name = "StringifyError";
}
function getEscapedString(value, sep) {
    if (value === undefined || value === null)
        return "";
    let str = "";
    if (typeof value === "object")
        str = JSON.stringify(value);
    else
        str = String(value);
    if (str.includes(sep) || str.includes(NEWLINE) || str.includes(QUOTE)) {
        return `${QUOTE}${str.replaceAll(QUOTE, `${QUOTE}${QUOTE}`)}${QUOTE}`;
    }
    return str;
}
function normalizeColumn(column) {
    let fn, header, prop;
    if (typeof column === "object") {
        if (Array.isArray(column)) {
            header = String(column[column.length - 1]);
            prop = column;
        }
        else {
            ({ fn } = column);
            prop = Array.isArray(column.prop) ? column.prop : [column.prop];
            header = typeof column.header === "string"
                ? column.header
                : String(prop[prop.length - 1]);
        }
    }
    else {
        header = String(column);
        prop = [column];
    }
    return { fn, header, prop };
}
async function getValuesFromItem(item, normalizedColumns) {
    const values = [];
    for (const column of normalizedColumns) {
        let value = item;
        for (const prop of column.prop) {
            if (typeof value !== "object" || value === null)
                continue;
            if (Array.isArray(value)) {
                if (typeof prop === "number")
                    value = value[prop];
                else {
                    throw new StringifyError('Property accessor is not of type "number"');
                }
            }
            else
                value = value[prop];
        }
        if (typeof column.fn === "function")
            value = await column.fn(value);
        values.push(value);
    }
    return values;
}
export async function stringify(data, columns, options = {}) {
    const { headers, separator: sep } = {
        headers: true,
        separator: ",",
        ...options,
    };
    if (sep.includes(QUOTE) || sep.includes(NEWLINE)) {
        const message = [
            "Separator cannot include the following strings:",
            '  - U+0022: Quotation mark (")',
            "  - U+000D U+000A: Carriage Return + Line Feed (\\r\\n)",
        ].join("\n");
        throw new StringifyError(message);
    }
    const normalizedColumns = columns.map(normalizeColumn);
    let output = "";
    if (headers) {
        output += normalizedColumns
            .map((column) => getEscapedString(column.header, sep))
            .join(sep);
        output += NEWLINE;
    }
    for (const item of data) {
        const values = await getValuesFromItem(item, normalizedColumns);
        output += values
            .map((value) => getEscapedString(value, sep))
            .join(sep);
        output += NEWLINE;
    }
    return output;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3N2X3N0cmluZ2lmeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNzdl9zdHJpbmdpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7QUFFOUIsTUFBTSxPQUFPLGNBQWUsU0FBUSxLQUFLO0lBQzlCLElBQUksR0FBRyxnQkFBZ0IsQ0FBQztDQUNsQztBQUVELFNBQVMsZ0JBQWdCLENBQUMsS0FBYyxFQUFFLEdBQVc7SUFDbkQsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJO1FBQUUsT0FBTyxFQUFFLENBQUM7SUFDckQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBRWIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBQ3RELEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFJekIsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNyRSxPQUFPLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEdBQUcsS0FBSyxHQUFHLEtBQUssRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUM7S0FDdkU7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUEyQkQsU0FBUyxlQUFlLENBQUMsTUFBYztJQUNyQyxJQUFJLEVBQTBCLEVBQzVCLE1BQWtDLEVBQ2xDLElBQThCLENBQUM7SUFFakMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDOUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1B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