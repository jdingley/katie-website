var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var session = require("express-session");
const express = require("express");
const app = express();
var server = http.createServer(app);
// use body parse for parsing POST request
const bodyParser = require("body-parser");
const port = 3000;

// we'll use mysql for db access and util to promisify queries
const util = require("util");
const mysql = require('mysql');

// use your own parameters for database
const mysqlConfig = {
	"connectionLimit": 10,
	"host": "localhost",
	"user": "root",
	"password": "",
  "database": "WebsiteDB",
};

const helmet = require("helmet");
app.use(helmet());

var homeRouter = require('./routes/home');
var aboutRouter = require('./routes/about');
var servicesRouter = require('./routes/services');
var contactRouter = require('./routes/contact');
var blogRouter = require('./routes/blog');

// view engine setup
var engine = require('ejs-mate');
app.engine('ejs', engine);
app.set('view engine', 'ejs');    
app.set('views', __dirname +'/views'); 
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', homeRouter);
app.use('/', aboutRouter);
app.use('/', servicesRouter);
app.use('/', contactRouter);
app.use('/', blogRouter);

// scheduler sends application/x-www-form-urlencoded requests,
app.use(bodyParser.urlencoded({ extended: true }));

// you'll need these headers if your API is deployed on a different domain than a public page
// in production system you could set Access-Control-Allow-Origin to your domains
// or drop this expression - by default CORS security is turned on in browsers
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "*");
	next();
});

// return static pages from "./public" directory
app.use(express.static(__dirname + "/public"));

const router = require("./router");

// open connection to mysql
const connectionPool = mysql.createPool(mysqlConfig);
connectionPool.query = util.promisify(connectionPool.query);

// add listeners to basic CRUD requests
const Storage = require("./storage");
const eventsStorage = new Storage(connectionPool);
router.setRoutes(app, "/events", eventsStorage);

// start server
app.listen(port, () => {
	console.log("Server is running on port " + port + "...");
});

app.use(function(req, res, next) {
  res.status(400).render('Error/denied_access', {
    controller: req.url.split('/')[1],
    view: req.url.split('/')[2],
    title: 'Page Not Found | Uplifting Counseling Services, LCC'

  });  
}); 

app.use(function(req, res, next) {
  res.status(404).render('Error/page_not_found', {
    controller: req.url.split('/')[1],
    view: req.url.split('/')[2],
    title: 'Page Not Found | Uplifting Counseling Services, LCC'
  });  
}); 

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).render('Error/internal_server_error', {
    controller: req.url.split('/')[1],
    view: req.url.split('/')[2],
    title: 'Internal Server Error | Uplifting Counseling Services, LCC'

  });  
}); 

module.exports = app;


