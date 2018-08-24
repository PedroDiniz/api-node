const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
require('dotenv').config();

const transport = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
});

transport.use(
  "compile",
  hbs({
    viewEngine: "handlebars",
    viewPath: path.resolve("./resources/mail"),
    extName: ".html"
  })
);

module.exports = transport;
