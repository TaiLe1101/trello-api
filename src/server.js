/* eslint-disable no-console */
import exitHook from "async-exit-hook";
import express from "express";

import { env } from "./config/environment";
import { CLOSE_DB, CONNECT_DB, GET_DB } from "./config/mongodb";

const START_SERVER = () => {
  const app = express();

  const hostname = env.APP_HOST || "localhost";
  const port = env.APP_PORT || 2000;

  app.get("/", async (req, res) => {
    // Test Absolute import mapOrder
    console.log(await GET_DB().listCollections().toArray());
    res.end("<h1>Hello World!</h1><hr>");
  });

  app.listen(port, hostname, () => {
    console.log(
      "[INFO] 👉",
      `Hello ${env.AUTHOR}, Server is running at http://${hostname}:${port} ✅`
    );
  });

  exitHook(() => {
    CLOSE_DB();
    console.log("[INFO] 👉", "Disconnected MongoDB");
    console.log("[INFO] 👉", "Exit App");
  });
};

(async () => {
  try {
    console.log("[INFO] 👉", "Connecting to MongoDB... ⌛");
    await CONNECT_DB();
    console.log("[INFO] 👉", "Connected successfully MongoDB ✅");
    START_SERVER();
  } catch (error) {
    console.log("[ERROR] 👉", `${error} ❌`);
    process.exit(0);
  }
})();
