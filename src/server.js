import express from "express";

const app = express();
const hostName = "localhost";
const port = 2003;

app.get("/", (req, res) => {
  return res.send("Hello anh em");
});

app.listen(port, hostName, () => {
  console.log(
    "[INFO] 👉",
    `Hello DevT, Server is running http://${hostName}:${port}/`
  );
});
