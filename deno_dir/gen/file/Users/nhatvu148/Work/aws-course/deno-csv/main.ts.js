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
const downloadLaunchData = async () => {
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
await downloadLaunchData();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYUEsT0FBTyxLQUFLLEdBQUcsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0QsT0FBTyxLQUFLLENBQUMsTUFBTSxpREFBaUQsQ0FBQztBQVNyRSxNQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztBQUUzQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFDZCxRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUUsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7UUFFakQsSUFBSSxFQUFFLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQzFDLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFNBQVMsRUFBRSxHQUNULE1BQU0sQ0FDSixJQUFJLElBQUksRUFBRSxFQUNWLHlCQUF5QixDQUU3QixvQkFBb0I7U0FDckIsQ0FBQztLQUNIO0lBRUQsT0FBTyxFQUFFO1FBQ1AsT0FBTyxFQUFFO1lBQ1AsS0FBSyxFQUFFLE9BQU87WUFDZCxRQUFRLEVBQUUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDO1NBQzlCO1FBRUQsS0FBSyxFQUFFO1lBQ0wsS0FBSyxFQUFFLE9BQU87WUFDZCxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUM7U0FDdEI7S0FDRjtDQUNGLENBQUMsQ0FBQztBQUVILE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDcEMsR0FBRyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLHdDQUF3QyxFQUFFO1FBQ3JFLE1BQU0sRUFBRSxLQUFLO0tBQ2QsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUU7UUFDaEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztLQUNoRDtJQUVELE1BQU0sVUFBVSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pDLEtBQUssTUFBTSxNQUFNLElBQUksVUFBVSxFQUFFO1FBQy9CLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5RCxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQVksRUFBRSxFQUFFO1lBQ3JELE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxVQUFVLEdBQUc7WUFDakIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxlQUFlLENBQUM7WUFDckMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUM7WUFDL0IsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLENBQUM7WUFDdkMsU0FBUztTQUNWLENBQUM7UUFFRixRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFbEQsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7S0FDdEM7SUFFRCxNQUFNLFNBQVMsR0FBRyxNQUFNLEtBQUssQ0FBQyw2QkFBNkIsRUFBRTtRQUMzRCxNQUFNLEVBQUUsTUFBTTtRQUNkLE9BQU8sRUFBRTtZQUNQLGNBQWMsRUFBRSxpQ0FBaUM7U0FDbEQ7UUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNuQixJQUFJLEVBQUUsV0FBVztZQUNqQixHQUFHLEVBQUUsYUFBYTtTQUNuQixDQUFDO0tBQ0gsQ0FBQyxDQUFDO0lBRUgsTUFBTSxJQUFJLEdBQUcsTUFBTSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDLENBQUM7QUFFRixNQUFNLGtCQUFrQixFQUFFLENBQUMifQ==