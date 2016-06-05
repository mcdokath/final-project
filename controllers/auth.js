// load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

passport.use(new BasicStrategy(
  function(username, password, callback) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return callback(err); }
      
      // no user found with that username
      if (!user) { return callback(null, false); }
      
      // verify password
      user.verifyPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }
        
        // password did not match
        if (!isMatch) { return callback(null, false); }
        
        // password DID match
        return callback(null, user);
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });
