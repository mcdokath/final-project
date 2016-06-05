// load required modules
var mongoose = require('mongoose');

// define client schema
var clientSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  id: { type: String, required: true },
  secret: { type: String, required: true},
  userId: { type: String, required: true }
});

// export Mongoose model
module.exports = mongoose.model('Client', clientSchema);
