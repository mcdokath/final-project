// Include required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var listController = require('./controllers/list');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var clientController = require('./controllers/client');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todolist');

// Create express application
var app = express();

// use body-parser with express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

// use passport with express
app.use(passport.initialize());

// create express router
var router = express.Router();

// create endpoint handlers for /lists
router.route('/lists')
  .post(authController.isAuthenticated, listController.postLists)
  .get(authController.isAuthenticated, listController.getLists);

// create endpoint handlers for /lists/:list_id
router.route('/lists/:list_id')
  .get(authController.isAuthenticated, listController.getList)
  .put(authController.isAuthenticated, listController.putList)
  .delete(authController.isAuthenticated, listController.deleteList);
  
// create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);
  
// create endpoint handlers for /clients
router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

// Register all routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);
