/* eslint-disable no-console */
import exitHook from "async-exit-hook";
import express from "express";

import { env } from "./config/environment";
import { CLOSE_DB, CONNECT_DB, GET_DB } from "./config/mongodb";
import { APIsV1 } from "~/routes/v1";
import { StatusCodes } from "http-status-codes";

const START_SERVER = () => {
  const app = express();

  const hostname = env.APP_HOST || "localhost";
  const port = env.APP_PORT || 2000;

  app.use(express.json());
  app.use("/v1", APIsV1);

  app.get("/", (req, res) => {
    return res.status(StatusCodes.OK).json({
      message: `Welcome to app by ${env.AUTHOR}, go to route v1 and use app`,
    });
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
