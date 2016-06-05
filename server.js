// Include required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var listController = require('./controllers/list');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var clientController = require('./controllers/client');
var oauth2Controller = require('./controllers/oauth2');
var ejs = require('ejs');
var session = require('express-session');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todolist');

// Create express application
var app = express();

// set view engine to ejs
app.set('view engine', 'ejs');

// use body-parser with express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

// use express session support (required by OAuth2orize)
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
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

// create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);

// Register all routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);
