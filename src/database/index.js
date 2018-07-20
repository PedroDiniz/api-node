const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/api-modelo-teste";

mongoose.connect(
  uri,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
