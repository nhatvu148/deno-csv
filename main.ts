for await (const dirEntry of Deno.readDir(Deno.cwd())) {
    console.log(dirEntry.name);
}