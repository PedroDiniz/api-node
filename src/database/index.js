const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
