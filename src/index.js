const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./app/routers/authRouter");
const projectRouter = require("./app/routers/projectRouter");
const socketEvents = require("./config/socketEvents");
const upload = require("./config/upload");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));

server = app.listen(3000);

const io = require("socket.io").listen(server);

socketEvents(io);

app.use("/api/auth", authRouter);
app.use("/api/project", projectRouter);

app.post("/upload", (req, res) => {
  upload(req, res, err => {
    err ? console.log(err, "error") : console.log("file: ", req.file);
  });
});

app.use("/", (req, res) => {
  res.send("Ok");
});
