const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./app/routers/authRouter");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./app/controllers/index")(app);

app.listen(3000);

app.use("/api/auth", authRouter);

app.use("/health-check", (req, res) => {
  res.send("Ok");
});
