// for await (const dirEntry of Deno.readDir(Deno.cwd())) {
//   console.log(dirEntry.name);
// }

// const files = [];

// while (true) {
//   const file = await Deno.open("main.ts");
//   const fileCount = files.push(file);
//   //   Deno.close(file.rid);
//   console.log(`Pushing... file #${fileCount}`);
// }

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
