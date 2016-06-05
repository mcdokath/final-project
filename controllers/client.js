// load required packages
var Client = require('../models/client');

// create /api/client for POST requests
exports.postClients = function(req, res) {
  // create new instance of Client model
  var client = new Client();
  
  // set client properties to POST data
  client.name = req.body.name;
  client.id = req.body.id;
  client.secret = req.body.secret;
  client.userId = req.user._id;
  
  // save client and check for errors
  client.save(function(err) {
    if (err)
      res.send(err);
      
    res.json({ message: 'Client added!', data: client });
  });
};

// create /api/clients for GET requests
exports.getClients = function(req, res) {
  // use Client model to find all clients
  Client.find({ userId: req.user._id }, function(err, clients) {
    if (err)
      res.send(err);
    
    res.json(clients);
  });
};
