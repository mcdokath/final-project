// Include required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var List = require('./models/list');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todolist');

// Create express application
var app = express();

// Use body-parser with express
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(bodyParser.json());

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the To-Do List API!' });
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

// create new route for /lists/:list_id prefix
var listRoute = router.route('/lists/:list_id');

// create /api/lists/:list_id to GET a single list
listRoute.get(function(req, res) {
  // use List model to find list by ID
  List.findById(req.params.list_id, function(err, list) {
    if (err)
      res.send(err);
    
    res.json(list);
  });
});

// create /api/lists/:list_id for PUT requests
listRoute.put(function(req, res) {
  // use List model to find specific list by Id
  List.findById(req.params.list_id, function(err, list) {
    if (err)
      res.send(err);
    
    // update list items TEST
    if (req.body.name)
      list.name = req.body.name;
    if (req.body.item1)
      list.item1 = req.body.item1;
    if (req.body.item2)
      list.item2 = req.body.item2;
    if (req.body.item3)
      list.item3 = req.body.item3;
    
    // save the list and check for errors
    list.save(function(err) {
      if (err)
        res.send(err);
        
      res.json(list);
    });
  });
});

// create /api/lists/:list_id for DELETE requests
listRoute.delete(function(req, res) {
  // use List model to find specific list by Id and remove
  List.findByIdAndRemove(req.params.list_id, function(err) {
    if (err)
      res.send(err);
    
    res.json({ message: 'List removed!' });
  });
});

// Register all routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert list on port ' + port);
console.log(req.headers);
console.log(req.body);
