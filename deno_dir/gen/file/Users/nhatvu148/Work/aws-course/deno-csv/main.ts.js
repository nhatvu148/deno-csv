import * as log from "https://deno.land/std/log/mod.ts";
import { format } from "https://deno.land/std/datetime/mod.ts";
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";
const launches = new Map();
await log.setup({
    handlers: {
        console: new log.handlers.ConsoleHandler("DEBUG"),
        file: new log.handlers.FileHandler("DEBUG", {
            filename: "./log.txt",
            formatter: `${format(new Date(), "MM-dd-yyyy HH:mm:ss.SSS")} {levelName} {msg}`,
        }),
    },
    loggers: {
        default: {
            level: "DEBUG",
            handlers: ["console", "file"],
        },
        tasks: {
            level: "ERROR",
            handlers: ["console"],
        },
    },
});
export const downloadLaunchData = async () => {
    log.info("Downloading launch data...");
    const response = await fetch("https://api.spacexdata.com/v3/launches", {
        method: "GET",
    });
    if (!response.ok) {
        log.warning("Problem downloading launch data");
        throw new Error("Launch data download failed");
    }
    const launchData = await response.json();
    for (const launch of launchData) {
        const payloads = launch["rocket"]["second_stage"]["payloads"];
        const customers = _.flatMap(payloads, (payload) => {
            return payload["customers"];
        });
        const flightData = {
            flightNumber: launch["flight_number"],
            mission: launch["mission_name"],
            rocket: launch["rocket"]["rocket_name"],
            customers,
        };
        launches.set(flightData.flightNumber, flightData);
        log.info(JSON.stringify(flightData));
    }
    const response2 = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
            name: "Elon Musk",
            job: "billionaire",
        }),
    });
    const body = await response2.json();
    console.log(body);
};
if (import.meta.main) {
    await downloadLaunchData();
    log.info(import.meta);
    log.info(`Downloaded data for ${launches.size} SpaceX launches.`);
}
export async function fetchGitHubDescription(name) {
    const response = await fetch("https://api.github.com/orgs/" + name);
    const body = await response.json();
    return body.description;
}
console.log("GitHub Fetcher 1.0");
if (import.meta.main) {
    console.log("Welcome to GitHub Fetcher");
    console.log(await fetchGitHubDescription("google"));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYUEsT0FBTyxLQUFLLEdBQUcsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0QsT0FBTyxLQUFLLENBQUMsTUFBTSxpREFBaUQsQ0FBQztBQVNyRSxNQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztBQUUzQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFDZCxRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUUsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7UUFFakQsSUFBSSxFQUFFLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQzFDLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFNBQVMsRUFBRSxHQUNULE1BQU0sQ0FDSixJQUFJLElBQUksRUFBRSxFQUNWLHlCQUF5QixDQUU3QixvQkFBb0I7U0FDckIsQ0FBQztLQUNIO0lBRUQsT0FBTyxFQUFFO1FBQ1AsT0FBTyxFQUFFO1lBQ1AsS0FBSyxFQUFFLE9BQU87WUFDZCxRQUFRLEVBQUUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDO1NBQzlCO1FBRUQsS0FBSyxFQUFFO1lBQ0wsS0FBSyxFQUFFLE9BQU87WUFDZCxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUM7U0FDdEI7S0FDRjtDQUNGLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLEtBQUssSUFBSSxFQUFFO0lBQzNDLEdBQUcsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUN2QyxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyx3Q0FBd0MsRUFBRTtRQUNyRSxNQUFNLEVBQUUsS0FBSztLQUNkLENBQUMsQ0FBQztJQUVILElBQUksQ0FB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