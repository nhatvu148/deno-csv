"use strict";
const downloadLaunchData = async () => {
    const response = await fetch("https://api.spacexdata.com/v3/launches", {
        method: "GET",
    });
    const launchData = await response.json();
    console.log(launchData);
};
await downloadLaunchData();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9Vc2Vycy9uaGF0dnUxNDgvV29yay9hd3MtY291cnNlL2Rlbm8tY3N2L21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQWFBLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDcEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsd0NBQXdDLEVBQUU7UUFDckUsTUFBTSxFQUFFLEtBQUs7S0FDZCxDQUFDLENBQUM7SUFFSCxNQUFNLFVBQVUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzFCLENBQUMsQ0FBQztBQUVGLE1BQU0sa0JBQWtCLEVBQUUsQ0FBQyJ9