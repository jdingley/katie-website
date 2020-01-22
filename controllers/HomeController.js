var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var app = express();
var server = http.createServer(app);
const mysql = require('mysql');

exports.RenderHomePage = function(req, res, next) {
  var db = mysql.createConnection ({
    user: 'root',
    password: '',
    server: 'localhost', 
    database: 'WebsiteDB' 
  });
  db.connect();
  db.query('SELECT * FROM quotes', function (error, results, fields) {
    if (error) throw error;

    res.render('Home/home_page',
    { 
      quote1: results[0].quote,
      author1: results[0].author,
      quote2: results[1].quote,
      author2: results[1].author,
      quote3: results[2].quote,
      author3: results[2].author,
      quote4: results[3].quote,
      author4: results[3].author,
      quote5: results[4].quote,
      author5: results[4].author,
      quote6: results[5].quote,
      author6: results[5].author,
      title: 'Home'
    })
  });
}
  