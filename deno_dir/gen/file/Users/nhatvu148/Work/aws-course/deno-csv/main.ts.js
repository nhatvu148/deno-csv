import * as log from "https://deno.land/std/log/mod.ts";
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
    console.log(launchData);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYUEsT0FBTyxLQUFLLEdBQUcsTUFBTSxrQ0FBa0MsQ0FBQztBQUV4RCxNQUFNLGtCQUFrQixHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ3BDLEdBQUcsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUN2QyxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyx3Q0FBd0MsRUFBRTtRQUNyRSxNQUFNLEVBQUUsS0FBSztLQUNkLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFO1FBQ2hCLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUMvQyxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7S0FDaEQ7SUFFRCxNQUFNLFVBQVUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXhCLE1BQU0sU0FBUyxHQUFHLE1BQU0sS0FBSyxDQUFDLDZCQUE2QixFQUFFO1FBQzNELE1BQU0sRUFBRSxNQUFNO1FBQ2QsT0FBTyxFQUFFO1lBQ1AsY0FBYyxFQUFFLGlDQUFpQztTQUNsRDtRQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ25CLElBQUksRUFBRSxXQUFXO1lBQ2pCLEdBQUcsRUFBRSxhQUFhO1NBQ25CLENBQUM7S0FDSCxDQUFDLENBQUM7SUFFSCxNQUFNLElBQUksR0FBRyxNQUFNLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQUVGLE1BQU0sa0JBQWtCLEVBQUUsQ0FBQyJ9