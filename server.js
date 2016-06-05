// Include required packages
var express = require('express');
var mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/beerlocker');

// Create express application
var app = express();

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'You are running dangerously low on beer!' });
});

// Register all routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert beer on port ' + port);
