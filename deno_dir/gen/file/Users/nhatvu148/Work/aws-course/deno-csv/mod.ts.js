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
    const planets = result.filter((planet) => {
        const planetaryRadius = Number(planet["koi_prad"]);
        const stellarMass = Number(planet["koi_smass"]);
        const stellarRadius = Number(planet["koi_srad"]);
        return planet["koi_disposition"] === "CONFIRMED" && planetaryRadius > 0.5 &&
            planetaryRadius < 1.5 && stellarMass > 0.78 && stellarMass < 1.04 &&
            stellarRadius > 0.99 && stellarRadius < 1.01;
    });
    return planets;
};
const newEarths = await loadPlanetData();
console.log(`${newEarths.length} habitable planets found!`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDOUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBTTlELE1BQU0sUUFBUSxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQzFCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFFN0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBR0YsTUFBTSxjQUFjLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDaEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO0lBRXJELE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxNQUFNLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxNQUFNLE1BQU0sR0FBRyxNQUFNLEtBQUssQ0FBQyxTQUFTLEVBQUU7UUFDcEMsWUFBWSxFQUFFLElBQUk7UUFDbEIsT0FBTyxFQUFFLEdBQUc7S0FDYixDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVyQixNQUFNLE9BQU8sR0FBSSxNQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ3JELE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNuRCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDaEQsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBRWpELE9BQU8sTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQUssV0FBVyxJQUFJLGVBQWUsR0FBRyxHQUFHO1lBQ3ZFLGVBQWUsR0FBRyxHQUFHLElBQUksV0FBVyxHQUFHLElBQUksSUFBSSxXQUFXLEdBQUcsSUFBSTtZQUNqRSxhQUFhLEdBQUcsSUFBSSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDakQsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDLENBQUM7QUFFRixNQUFNLFNBQVMsR0FBRyxNQUFNLGNBQWMsRUFBRSxDQUFDO0FBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSwyQkFBMkIsQ0FBQyxDQUFDIn0=