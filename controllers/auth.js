// load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');
var Client = require('../models/client');

passport.use('client-basic', new BasicStrategy(
  function(username, password, callback) {
    Client.findOne({ id: username }, function (err, client) {
      if (err) { return callback(err); }
      
      // no client found with that id or bad password
      if (!client || client.secret !== password) { return callback(null, false); }
      
      // success
      return callback(null, client);
    });
  }
));

exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
