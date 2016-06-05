// Include required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var List = require('./models/list');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/beerlocker');

// Create express application
var app = express();

// Use body-parser with express
app.use(bodyParser.urlencoded({
  extended:true
}));

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'You are running dangerously low on beer!' });
});

// create new route for lists
var listsRoute = router.route('/lists');

// create /api/lists for POST requests
listsRoute.post(function(req, res) {
  // create new instance of List model
  var list = new List();
  
  // assign list properties based on POST data
  list.name = req.body.name;
  list.item1 = req.body.item1;
  list.item2 = req.body.item2;
  list.item3 = req.body.item3;
  
  // save list and check for errors
  list.save(function(err) {
    if (err)
      res.send(err);
      
    res.json({ message: 'List added!', data: list });
  });
});

// create /api/lists for GET requests
listsRoute.get(function(req, res) {
  // use List model to find all lists
  List.find(function(err, lists) {
    if (err)
      res.send(err);
      
    res.json(lists);
  });
});

// Register all routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert beer on port ' + port);
