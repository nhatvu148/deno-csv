"use strict";
const files = [];
while (true) {
    const file = await Deno.open("main.ts");
    const fileCount = files.push(file);
    console.log(`Pushing... file #${fileCount}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9Vc2Vycy9uaGF0dnUxNDgvV29yay9hd3MtY291cnNlL2Rlbm8tY3N2L21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUVqQixPQUFPLElBQUksRUFBRTtJQUNYLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4QyxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRW5DLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLFNBQVMsRUFBRSxDQUFDLENBQUM7Q0FDOUMifQ==