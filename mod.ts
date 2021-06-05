import { join } from "https://deno.land/std/path/mod.ts";

const readFile = async () => {
  const path = join("text_files", "hello.txt");

  const data = await Deno.readTextFile(path);
  
  console.log(data);
};

await readFile();
