// Load required packages
var List = require('../models/list');

// Create /api/lists for POST requests
exports.postLists = function(req, res) {
  // create new instance of List model
  var list = new List();
  
  // set list properties to POST data
  list.name = req.body.name;
  list.item1 = req.body.item1;
  list.item2 = req.body.item2;
  list.item3 = req.body.item3;
  list.userId = req.user._id;
  
  // save list and check for errors
  list.save(function(err) {
    if (err)
      res.send(err);
      
    res.json({ message: 'List added!', data: list });
  });
};

// Create /api/lists for GET requests
exports.getLists = function(req, res) {
  // use List model to find all lists
  List.find({ userId: req.user._id }, function(err, lists) {
    if (err)
      res.send(err);
    
    res.json(lists);
  });
};

// Create /api/lists/:list_id for GET requests
exports.getList = function(req, res) {
  // use List model to find specific list
  List.findById({ userId: req.user._id, _id: req.params.list_id}, function(err, list) {
    if (err)
      res.send(err);
      
    res.json(list);
  });
};

// Create /api/lists/:list_id for PUT requests
exports.putList = function(req, res) {
  // use List model to find specific list  WE NEED TO BE ABLE TO UPDATE ANY PART OF THE LIST
  List.update({ userId: req.user._id, _id: req.params.list_id }, { name: req.body.name }, function(err, list) {
    if (err)
      res.send(err);

    res.json({ message: 'List updated!' + list });
  });
};

// Create /api/lists/:list_id for DELETE requests
exports.deleteList = function(req, res) {
  // use List model to find specific list and remove it
  List.remove({ userId: req.user._id, _id: req.params.list_id}, function(err) {
    if (err)
      res.send(err);
    
    res.json({ message: 'List removed!' });
  });
};
