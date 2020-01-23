var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var app = express();
var server = http.createServer(app);
const mysql = require('mysql');
var session = require("express-session");
var okta = require("@okta/okta-sdk-nodejs");
var ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;

server.listen(3000);

var oktaClient = new okta.Client({
  orgUrl: '{https://dev-738230.okta.com}',
  token: '{00W095NyGvjQ86jGcs7E_QaLhRRm4u6hak2pErarjh}'
});
const oidc = new ExpressOIDC({
  issuer: "{https://dev-738230.okta.com}/oauth2/default",
  client_id: '{0oa121h1g9I6zfRg04x6}',
  client_secret: '{YaFz9O856HdK-wVqV-Yv0M4YmIkPzvAzsmsvuMCk}',
  redirect_uri: 'http://localhost:3000/users/callback',
  scope: "openid profile",
  routes: {
    login: {
      path: "/users/login"
    },
    callback: {
      path: "/users/callback",
      defaultRedirect: "/dashboard"
    }
  }
});

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'adfi;hrsioghiordghjpoudhgjsfdng;klfdhjgjkfngjksdfn',
  resave: true,
  saveUninitialized: false
}));
app.use(oidc.router);

app.use('/', homeRouter);
app.use('/', aboutRouter);
app.use('/', servicesRouter);
app.use('/', contactRouter);
app.use('/', blogRouter);

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
