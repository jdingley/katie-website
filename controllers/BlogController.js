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

exports.RenderBlog = function(req, res, next) {
  var db = mysql.createConnection ({
    user: 'root',
    password: '',
    server: 'localhost', 
    database: 'WebsiteDB' 
  });
  db.connect();
  async.parallel [(
    function(cb) { 
      db.query('SELECT id, author, title, content, DATE_FORMAT(date, "%a %b, %d %Y") AS "date" FROM blog_posts', cb) 
    },
    
    function(cb) {
      db.query('SELECT id, author, title, content, DATE_FORMAT(date, "%a %b, %d %Y") AS "date" FROM blog_posts', cb)
    }
  )],
    function (error, results, fields) {
      if (error) throw error;

      res.render('Blog/blog',
      { 
        results: results[0],
        posts: results[0].content,
        blog_title: results[0].title,
        author: results[0].author,
        date: results[0].date,
        title: 'Blog'
      })
  };
}
