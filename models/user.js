// load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define user schema
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this;
  
  // if password unchanged, break out
  if (!user.isModified('password')) return callback();
  
  // if password changed, hash password
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);
    
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

// export Mongoose model
module.exports = mongoose.model('User', UserSchema);
