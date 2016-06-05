// load required packages
var mongoose = require('mongoose');

// define list schema
var listSchema = new mongoose.Schema({
  name: String,
  item1: String,
  item2: String,
  item3: String
})

// export model
module.exports = mongoose.model('List', listSchema);
