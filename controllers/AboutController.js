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
var session = require("express-session");

var db = mysql.createPool ({
  user: 'root',
  password: '',
  server: 'localhost', 
  database: 'WebsiteDB'
});

exports.RenderAboutPage = function(req, res, next) {
  db.getConnection (function (err, connection) {
    async.parallel ([
      function(cb) { 
        db.query('SELECT id, author, title, content, DATE_FORMAT(date, "%a %b, %d %Y") AS "date" FROM blog_posts', cb) 
      },
      
      function(cb) {
        db.query('SELECT * FROM availability', cb)
      }
    ],
      function (error, results, fields) {
        if (error) throw error;

        res.render('About/about_page',
        { 
          results: results[0],
          posts: results[0].content,
          blog_title: results[0].title,
          author: results[0].author,
          date: results[0].date,
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

  