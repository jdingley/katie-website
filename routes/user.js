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
//-----------------------------------------------login page call------------------------------------------------------
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
     
      var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'"; 
      db.getConnection (function (err, connection) {                          
         async.parallel ([
            function(cb) {
               db.query(sql, cb)
            },
            function(cb) {
               db.query('SELECT * FROM availability', cb)
            }
         ],function(err, results){      
            if(results.length){
               req.session.userId = results[0][0].id;
               req.session.user = results[0][0];
               console.log(results[0][0].id);
               res.render('Contact/admin_login.ejs', {
                  monday_time: results[1][0][0].times,
                  tuesday_time: results[1][0][1].times,
                  wednesday_time: results[1][0][2].times,
                  thursday_time: results[1][0][3].times,
                  friday_time: results[1][0][4].times,
                  saturday_time: results[1][0][5].times,
                  sunday_time: results[1][0][6].times,
                  title: 'Login'
               });
            }
            else{
               message = 'Wrong Credentials.';
               res.render('Contact/admin_login.ejs',{ 
                  message: message,
                  monday_time: results[1][0][0].times,
                  tuesday_time: results[1][0][1].times,
                  wednesday_time: results[1][0][2].times,
                  thursday_time: results[1][0][3].times,
                  friday_time: results[1][0][4].times,
                  saturday_time: results[1][0][5].times,
                  sunday_time: results[1][0][6].times,
                  title: 'Login'
               })
            }
         });
      });
   } else {
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
     
             res.render('Contact/admin_login.ejs',
             { 
               message: message,
               monday_time: results[1][0][0].times,
               tuesday_time: results[1][0][1].times,
               wednesday_time: results[1][0][2].times,
               thursday_time: results[1][0][3].times,
               friday_time: results[1][0][4].times,
               saturday_time: results[1][0][5].times,
               sunday_time: results[1][0][6].times,
               title: 'Login'
             })
         });
       });
   }
           
};
//-----------------------------------------------dashboard page functionality----------------------------------------------
           
exports.dashboard = function(req, res, next){
           
   var user =  req.session.user,
   userId = req.session.userId;
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";

   db.query(sql, function(err, results){
      res.render('home_page.ejs', {user:user});    
   });       
};
//------------------------------------logout functionality----------------------------------------------
exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/login");
   })
};

