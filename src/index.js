const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./app/routers/authRouter");
const projectRouter = require("./app/routers/projectRouter");
const multer = require("multer");
const path = require("path");

//storage engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single("myImage");

//Check File type
const checkFileType = (file, cb) => {
  //Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  //Check extensions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //Check mime
  const mimetype = filetypes.test(file.mimetype);

  mimetype && extname ? cb(null, true) : cb("error: Images Only");
};

//init app
const app = express();

//public folder
app.use(express.static("./public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000);

// rotas
app.use("/api/auth", authRouter);
app.use("/api/project", projectRouter);
app.post("/upload", (req, res) => {
  upload(req, res, err => {
    err ? console.log(err, "error") : console.log("file: ", req.file);
  });
});

app.use("/api", (req, res) => {
  res.send("Ok");
});
