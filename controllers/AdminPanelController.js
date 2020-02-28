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
  user: 'root',
  password: '',
  server: 'localhost', 
  database: 'WebsiteDB'
});

exports.RenderAdminPanel = function(req, res, next) {
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

      res.render('AdminPanel/admin_panel', 
      { 
        authority: "ROLE_ADMIN",
        monday_time: results[1][0][0].times,
        tuesday_time: results[1][0][1].times,
        wednesday_time: results[1][0][2].times,
        thursday_time: results[1][0][3].times,
        friday_time: results[1][0][4].times,
        saturday_time: results[1][0][5].times,
        sunday_time: results[1][0][6].times,
        title: "Admin Panel" 
      });
    });
  });
}
  exports.RenderEditQuote = function(req, res, next) {
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
    
      res.render('AdminPanel/edit_quote', 
      { 
        authority: "ROLE_ADMIN",
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
        title: "Edit Quote" 
      });
    });
  });
}
  exports.RenderEditTime = function(req, res, next) {
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
    
      res.render('AdminPanel/edit_time', 
      { 
        authority: "ROLE_ADMIN",
        monday_time: results[1][0][0].times,
        tuesday_time: results[1][0][1].times,
        wednesday_time: results[1][0][2].times,
        thursday_time: results[1][0][3].times,
        friday_time: results[1][0][4].times,
        saturday_time: results[1][0][5].times,
        sunday_time: results[1][0][6].times,
        title: "Edit Availability" 
      });
    });
  });
}
  exports.RenderAddBlog = function(req, res, next) {
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
          console.log(results[0][0]);
    
      res.render('AdminPanel/add_blog', 
      { 
        authority: "ROLE_ADMIN",
        blog_post: results[0][0],
        monday_time: results[1][0][0].times,
        tuesday_time: results[1][0][1].times,
        wednesday_time: results[1][0][2].times,
        thursday_time: results[1][0][3].times,
        friday_time: results[1][0][4].times,
        saturday_time: results[1][0][5].times,
        sunday_time: results[1][0][6].times,
        title: "Add Blog Posts" 
      });
    });
  });
}

exports.PostEditQuote = function(req, res, next) {
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
  
    res.render('AdminPanel/edit_quote', 
    { 
      authority: "ROLE_ADMIN",
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
      title: "Edit Quote" 
    });
  });
});
}
exports.PostEditTime = function(req, res, next) {
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
  
    res.render('AdminPanel/edit_time', 
    { 
      authority: "ROLE_ADMIN",
      blog_post: results[0][0],
      monday_time: results[1][0][0].times,
      tuesday_time: results[1][0][1].times,
      wednesday_time: results[1][0][2].times,
      thursday_time: results[1][0][3].times,
      friday_time: results[1][0][4].times,
      saturday_time: results[1][0][5].times,
      sunday_time: results[1][0][6].times,
      title: "Edit Availability" 
    });
  });
});
}
exports.PostBlog = function(req, res, next) {
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
  
    res.render('AdminPanel/add_blog', 
    { 
      authority: "ROLE_ADMIN",
      monday_time: results[1][0][0].times,
      tuesday_time: results[1][0][1].times,
      wednesday_time: results[1][0][2].times,
      thursday_time: results[1][0][3].times,
      friday_time: results[1][0][4].times,
      saturday_time: results[1][0][5].times,
      sunday_time: results[1][0][6].times,
      title: "Add Blog Posts" 
    });
  });
});
}