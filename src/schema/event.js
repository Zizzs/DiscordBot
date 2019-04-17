let mongoose = require("mongoose");

let event = new mongoose.Schema({
  title: String,
  url: String,
  type: String
});

module.exports = event;
