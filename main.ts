// for await (const dirEntry of Deno.readDir(Deno.cwd())) {
//   console.log(dirEntry.name);
// }

const files = [];

while (true) {
  const file = await Deno.open("main.ts");
  const fileCount = files.push(file);
  //   Deno.close(file.rid);
  console.log(`Pushing... file #${fileCount}`);
}
