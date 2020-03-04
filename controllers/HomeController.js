var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var app = express();
var server = http.createServer(app);
const mysql = require('mysql');
var async = require("async");
const querystring = require('querystring');
var session = require("express-session");

var db = mysql.createPool ({
	"host": "localhost",
	"user": "root",
	"password": "Fallingdown#21",
  "database": "WebsiteDB",
});

exports.RenderHomePage = function(req, res, next) {
  db.getConnection (function (err, connection) {
    async.parallel ([
      function(cb) { 
        db.query('SELECT * FROM quotes', cb) 
      },
      function(cb) {
        db.query('SELECT * FROM availability', cb)
      }
    ],
      function (error, results, fields) {
      if (error) throw error;
			var session = req.session;
      res.render('Home/home_page',
      { 
        loggedin: req.session.loggedin,
				message: 0,
        quote1: results[0][0][0].quote,
        author1: results[0][0][0].author,
        quote2: results[0][0][1].quote,
        author2: results[0][0][1].author,
        quote3: results[0][0][2].quote,
        author3: results[0][0][2].author,
        quote4: results[0][0][3].quote,
        author4: results[0][0][3].author,
        quote5: results[0][0][4].quote,
        author5: results[0][0][4].author,
        quote6: results[0][0][5].quote,
        author6: results[0][0][5].author,
        monday_time: results[1][0][0].times,
        tuesday_time: results[1][0][1].times,
        wednesday_time: results[1][0][2].times,
        thursday_time: results[1][0][3].times,
        friday_time: results[1][0][4].times,
        saturday_time: results[1][0][5].times,
        sunday_time: results[1][0][6].times,
        title: 'Home'
      })
    });
  });
}
  