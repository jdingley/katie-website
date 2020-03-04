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
var db_debug = mysql.createPool ({
	"host": "localhost",
	"user": "root",
	"password": "Fallingdown#21",
  "database": "WebsiteDB",
	debug: true
});

exports.RenderAboutPage = function(req, res, next) {
  db.getConnection (function (err, connection) {
    async.parallel ([
      function(cb) { 
        db.query('SELECT * FROM certifications WHERE type = 1', cb) 
      },
      function(cb) {
        db.query('SELECT * FROM availability', cb)
      },
			function(cb) { 
        db.query('SELECT * FROM certifications WHERE type = 2', cb) 
      },
			function(cb) { 
        db.query('SELECT * FROM certifications WHERE type = 3', cb) 
      },
    ],
      function (error, results, fields) {
        if (error) throw error;
				console.log(results[0][0][0]);
				var session = req.session;
        res.render('About/about_page',
        { 
          loggedin: req.session.loggedin,
          qualifications: results[0][0],
					certifications: results[2][0],
					memberships: results[3][0],
          monday_time: results[1][0][0].times,
          tuesday_time: results[1][0][1].times,
          wednesday_time: results[1][0][2].times,
          thursday_time: results[1][0][3].times,
          friday_time: results[1][0][4].times,
          saturday_time: results[1][0][5].times,
          sunday_time: results[1][0][6].times,
          title: 'About'
        })
    });
  });
}

  