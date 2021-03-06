const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const socketEvents = require("../app/middlewares/socketEvents");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(express.static("./public"));

server = app.listen(3000);

const io = require("socket.io").listen(server);

socketEvents(io);

module.exports = app;
