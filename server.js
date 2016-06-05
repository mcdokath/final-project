// Include required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var listController = require('./controllers/list');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todolist');

// Create express application
var app = express();

// use body-parser with express
app.use(bodyParser.urlencoded({
  extended:true
}));

// create express router
var router = express.Router();

// create endpoint handlers for /lists
router.route('/lists')
  .post(listController.postLists)
  .get(listController.getLists);

// create endpoint handlers for /lists/:list_id
router.route('/lists/:list_id')
  .get(listController.getList)
  .put(listController.putList)
  .delete(listController.deleteList);

// Register all routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);
