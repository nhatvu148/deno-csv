import * as log from "https://deno.land/std/log/mod.ts";
import { format } from "https://deno.land/std/datetime/mod.ts";
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
        const flightData = {
            flightNumber: launch["flight_number"],
            mission: launch["mission_name"],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYUEsT0FBTyxLQUFLLEdBQUcsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFPL0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7QUFFM0MsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDO0lBQ2QsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO1FBRWpELElBQUksRUFBRSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUMxQyxRQUFRLEVBQUUsV0FBVztZQUNyQixTQUFTLEVBQUUsR0FDVCxNQUFNLENBQ0osSUFBSSxJQUFJLEVBQUUsRUFDVix5QkFBeUIsQ0FFN0Isb0JBQW9CO1NBQ3JCLENBQUM7S0FDSDtJQUVELE9BQU8sRUFBRTtRQUNQLE9BQU8sRUFBRTtZQUNQLEtBQUssRUFBRSxPQUFPO1lBQ2QsUUFBUSxFQUFFLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQztTQUM5QjtRQUVELEtBQUssRUFBRTtZQUNMLEtBQUssRUFBRSxPQUFPO1lBQ2QsUUFBUSxFQUFFLENBQUMsU0FBUyxDQUFDO1NBQ3RCO0tBQ0Y7Q0FDRixDQUFDLENBQUM7QUFFSCxNQUFNLGtCQUFrQixHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ3BDLEdBQUcsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUN2QyxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyx3Q0FBd0MsRUFBRTtRQUNyRSxNQUFNLEVBQUUsS0FBSztLQUNkLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFO1FBQ2hCLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUMvQyxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7S0FDaEQ7SUFFRCxNQUFNLFVBQVUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QyxLQUFLLE1BQU0sTUFBTSxJQUFJLFVBQVUsRUFBRTtRQUMvQixNQUFNLFVBQVUsR0FBRztZQUNqQixZQUFZLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQztZQUNyQyxPQUFPLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQztTQUNoQyxDQUFDO1FBRUYsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRWxELEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0tBQ3RDO0lBRUQsTUFBTSxTQUFTLEdBQUcsTUFBTSxLQUFLLENBQUMsNkJBQTZCLEVBQUU7UUFDM0QsTUFBTSxFQUFFLE1BQU07UUFDZCxPQUFPLEVBQUU7WUFDUCxjQUFjLEVBQUUsaUNBQWlDO1NBQ2xEO1FBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbkIsSUFBSSxFQUFFLFdBQVc7WUFDakIsR0FBRyxFQUFFLGFBQWE7U0FDbkIsQ0FBQztLQUNILENBQUMsQ0FBQztJQUVILE1BQU0sSUFBSSxHQUFHLE1BQU0sU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxrQkFBa0IsRUFBRSxDQUFDIn0=