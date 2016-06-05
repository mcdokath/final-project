// load required packages
var mongoose = require('mongoose');

// define token schema
var CodeSchema = new mongoose.Schema({
  value: { type: String, required: true },
  redirectUri: { type: String, required: true },
  userId: { type: String, required: true },
  clientId: { type: String, required: true }
});

// export Mongoose model
module.exports = mongoose.model('Code', CodeSchema);
