"use strict";
const downloadLaunchData = async () => {
    const response = await fetch("https://api.spacexdata.com/v3/launches", {
        method: "GET",
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9Vc2Vycy9uaGF0dnUxNDgvV29yay9hd3MtY291cnNlL2Rlbm8tY3N2L21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQWFBLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDcEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsd0NBQXdDLEVBQUU7UUFDckUsTUFBTSxFQUFFLEtBQUs7S0FDZCxDQUFDLENBQUM7SUFFSCxNQUFNLFVBQVUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXhCLE1BQU0sU0FBUyxHQUFHLE1BQU0sS0FBSyxDQUFDLDZCQUE2QixFQUFFO1FBQzNELE1BQU0sRUFBRSxNQUFNO1FBQ2QsT0FBTyxFQUFFO1lBQ1AsY0FBYyxFQUFFLGlDQUFpQztTQUNsRDtRQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ25CLElBQUksRUFBRSxXQUFXO1lBQ2pCLEdBQUcsRUFBRSxhQUFhO1NBQ25CLENBQUM7S0FDSCxDQUFDLENBQUM7SUFFSCxNQUFNLElBQUksR0FBRyxNQUFNLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVwQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQUVGLE1BQU0sa0JBQWtCLEVBQUUsQ0FBQyJ9