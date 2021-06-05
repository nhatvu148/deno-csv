import { join } from "https://deno.land/std/path/mod.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";
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
    return planets.map((planet) => _.pick(planet, [
        "koi_disposition",
        "koi_smass",
        "koi_srad",
        "kepler_name",
        "koi_count",
        "koi_steff",
    ]));
};
const newEarths = await loadPlanetData();
for (const planet of newEarths) {
    console.log(planet);
}
console.log(`${newEarths.length} habitable planets found!`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDOUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRTlELE9BQU8sS0FBSyxDQUFDLE1BQU0saURBQWlELENBQUM7QUFNckUsTUFBTSxRQUFRLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDMUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQztJQUU3QyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDLENBQUM7QUFHRixNQUFNLGNBQWMsR0FBRyxLQUFLLElBQUksRUFBRTtJQUNoQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLDRCQUE0QixDQUFDLENBQUM7SUFFckQsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLE1BQU0sU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sTUFBTSxHQUFHLE1BQU0sS0FBSyxDQUFDLFNBQVMsRUFBRTtRQUNwQyxZQUFZLEVBQUUsSUFBSTtRQUNsQixPQUFPLEVBQUUsR0FBRztLQUNiLENBQUMsQ0FBQztJQUNILElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXJCLE1BQU0sT0FBTyxHQUFJLE1BQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDckQsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNoRCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFFakQsT0FBTyxNQUFNLENBQUMsaUJBQWlCLENBQUMsS0FBSyxXQUFXLElBQUksZUFBZSxHQUFHLEdBQUc7WUFDdkUsZUFBZSxHQUFHLEdBQUcsSUFBSSxXQUFXLEdBQUcsSUFBSSxJQUFJLFdBQVcsR0FBRyxJQUFJO1lBQ2pFLGFBQWEsR0FBRyxJQUFJLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQztJQUNqRCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ2IsaUJBQWlCO1FBQ2pCLFdBQVc7UUFDWCxVQUFVO1FBQ1YsYUFBYTtRQUNiLFdBQVc7UUFDWCxXQUFXO0tBQ1osQ0FBQyxDQUNILENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixNQUFNLFNBQVMsR0FBRyxNQUFNLGNBQWMsRUFBRSxDQUFDO0FBRXpDLEtBQUssTUFBTSxNQUFNLElBQUksU0FBUyxFQUFFO0lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDckI7QUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sMkJBQTJCLENBQUMsQ0FBQyJ9