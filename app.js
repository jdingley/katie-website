var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var app = express();
var server = http.createServer(app);

server.listen(3000);

var homeRouter = require('./routes/home');

// view engine setup
var engine = require('ejs-mate');
app.engine('ejs', engine);
app.set('view engine', 'ejs');    
app.set('views', __dirname +'/views'); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);

app.use(function(req, res, next) {
  res.status(400).render('Error/denied_access', {
    controller: req.url.split('/')[1],
    view: req.url.split('/')[2],
    title: 'Page Not Found | SMART Carpet Portal System'
  });  
}); 

app.use(function(req, res, next) {
  res.status(404).render('Error/page_not_found', {
    controller: req.url.split('/')[1],
    view: req.url.split('/')[2],
    title: 'Page Not Found | SMART Carpet Portal System'
  });  
}); 

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).render('Error/internal_server_error', {
    controller: req.url.split('/')[1],
    view: req.url.split('/')[2],
    title: 'Internal Server Error | SMART Carpet Portal System'
  });  
}); 
module.exports = app;
