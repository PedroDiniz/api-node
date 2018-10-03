const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./app/routers/authRouter");
const projectRouter = require("./app/routers/projectRouter");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000);

app.use("/api/auth", authRouter);
app.use("/api/project", projectRouter);

app.use("/api", (req, res) => {
  res.send("Ok");
});
