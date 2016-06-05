// Include required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var listController = require('./controllers/list');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todolist');

// Create express application
var app = express();

// use body-parser with express
app.use(bodyParser.urlencoded({
  extended:true
}));

// use passport with express
app.use(passport.initialize());

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
  
// create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Register all routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);
