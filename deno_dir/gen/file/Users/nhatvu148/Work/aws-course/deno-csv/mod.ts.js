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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDOUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRTlELE1BQU0sUUFBUSxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQzFCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFFN0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxjQUFjLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDaEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO0lBRXJELE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxNQUFNLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxNQUFNLE1BQU0sR0FBRyxNQUFNLEtBQUssQ0FBQyxTQUFTLEVBQUU7UUFDcEMsWUFBWSxFQUFFLElBQUk7UUFDbEIsT0FBTyxFQUFFLEdBQUc7S0FDYixDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVyQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQztBQUVGLE1BQU0sY0FBYyxFQUFFLENBQUMifQ==