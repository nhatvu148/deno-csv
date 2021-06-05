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

import * as log from "https://deno.land/std/log/mod.ts";
import { format } from "https://deno.land/std/datetime/mod.ts";

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG"),

    file: new log.handlers.FileHandler("DEBUG", {
      filename: "./log.txt",
      formatter: `${
        format(
          new Date(),
          "MM-dd-yyyy HH:mm:ss.SSS",
        )
      } {levelName} {msg}`,
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
