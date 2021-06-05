import { join } from "https://deno.land/std/path/mod.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";

const readFile = async () => {
  const path = join("text_files", "hello.txt");

  const data = await Deno.readTextFile(path);

  console.log(data);
};

const loadPlanetData = async () => {
  const path = join(".", "kepler_exoplanets_nasa.csv");

  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, {
    skipFirstRow: true,
    comment: "#",
  });
  Deno.close(file.rid);

  console.log(result);
};

await loadPlanetData();
