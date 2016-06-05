// load required packages
var User = require('../models/user');

// create /api/users for POST requests
exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });
  
  user.save(function(err) {
    if (err)
      res.send(err);
      
    res.json({ message: 'New user added!' });
  });
};

// create /api/users for GET requests
exports.getUsers = function(req, res) {
  Users.find(function(err, users) {
    if (err)
      res.send(err);
      
    res.json(users);
  });
};
