const app = require("./config/express");
const authRouter = require("./app/routers/authRouter");
const projectRouter = require("./app/routers/projectRouter");
const upload = require("./app/middlewares/upload");

app.use("/", (req, res) => {
  res.send("Ok");
});

app.post("/upload", (req, res) => {
  upload(req, res, err => {
    if(err) {
      console.log(err, "error")
    }else{
      console.log("file: ", req.file);
    }
  });
});

app.use("/api/auth", authRouter);
app.use("/api/project", projectRouter);

