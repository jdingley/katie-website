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

exports.RenderServicesPage = function(req, res, next) {
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

      res.render('Services/services_page', 
      { 
        monday_time: results[1][0][0].times,
        tuesday_time: results[1][0][1].times,
        wednesday_time: results[1][0][2].times,
        thursday_time: results[1][0][3].times,
        friday_time: results[1][0][4].times,
        saturday_time: results[1][0][5].times,
        sunday_time: results[1][0][6].times,
        title: "Services" 
      });
    });
  });
}
  exports.RenderPaymentsPage = function(req, res, next) {
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
    
      res.render('Services/payment_page', 
      { 
        monday_time: results[1][0][0].times,
        tuesday_time: results[1][0][1].times,
        wednesday_time: results[1][0][2].times,
        thursday_time: results[1][0][3].times,
        friday_time: results[1][0][4].times,
        saturday_time: results[1][0][5].times,
        sunday_time: results[1][0][6].times,
        title: "Payments" 
      });
    });
  });
}
  exports.RenderIntakePage = function(req, res, next) {
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
    
      res.render('Services/intake_page', 
      { 
        monday_time: results[1][0][0].times,
        tuesday_time: results[1][0][1].times,
        wednesday_time: results[1][0][2].times,
        thursday_time: results[1][0][3].times,
        friday_time: results[1][0][4].times,
        saturday_time: results[1][0][5].times,
        sunday_time: results[1][0][6].times,
        title: "Intake Forms and Consent" 
      });
    });
  });
}
  exports.RenderAreaOfFocusPage = function(req, res, next) {
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
    
      res.render('Services/AOF/areas_of_focus', 
      { 
        monday_time: results[1][0][0].times,
        tuesday_time: results[1][0][1].times,
        wednesday_time: results[1][0][2].times,
        thursday_time: results[1][0][3].times,
        friday_time: results[1][0][4].times,
        saturday_time: results[1][0][5].times,
        sunday_time: results[1][0][6].times,
        title: "Areas of Focus" 
      });
    });
  });
}
  exports.RenderPreteens = function(req, res, next) {
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
    
      res.render('Services/AOF/preteen', 
      { 
        monday_time: results[1][0][0].times,
        tuesday_time: results[1][0][1].times,
        wednesday_time: results[1][0][2].times,
        thursday_time: results[1][0][3].times,
        friday_time: results[1][0][4].times,
        saturday_time: results[1][0][5].times,
        sunday_time: results[1][0][6].times,
        title: "Preteens and Tweens" 
      });
    });
  });
}
  exports.RenderTeens = function(req, res, next) {
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
    
      res.render('Services/AOF/teen', 
      { 
        monday_time: results[1][0][0].times,
        tuesday_time: results[1][0][1].times,
        wednesday_time: results[1][0][2].times,
        thursday_time: results[1][0][3].times,
        friday_time: results[1][0][4].times,
        saturday_time: results[1][0][5].times,
        sunday_time: results[1][0][6].times,
        title: "Adolescents and Teenagers" 
      });
    });
  });
}
  exports.RenderAdults = function(req, res, next) {
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
    
      res.render('Services/AOF/adult', 
      { 
        monday_time: results[1][0][0].times,
        tuesday_time: results[1][0][1].times,
        wednesday_time: results[1][0][2].times,
        thursday_time: results[1][0][3].times,
        friday_time: results[1][0][4].times,
        saturday_time: results[1][0][5].times,
        sunday_time: results[1][0][6].times,
        title: "Adults" 
      });
    });
  });
}
  exports.RenderElderly= function(req, res, next) {
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
    
      res.render('Services/AOF/elderly', 
      { 
        monday_time: results[1][0][0].times,
        tuesday_time: results[1][0][1].times,
        wednesday_time: results[1][0][2].times,
        thursday_time: results[1][0][3].times,
        friday_time: results[1][0][4].times,
        saturday_time: results[1][0][5].times,
        sunday_time: results[1][0][6].times,
        title: "The Elderly" 
      });
    });
  });
}
  exports.RenderDisabilities= function(req, res, next) {
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
    
      res.render('Services/AOF/disabilites', 
      { 
        monday_time: results[1][0][0].times,
        tuesday_time: results[1][0][1].times,
        wednesday_time: results[1][0][2].times,
        thursday_time: results[1][0][3].times,
        friday_time: results[1][0][4].times,
        saturday_time: results[1][0][5].times,
        sunday_time: results[1][0][6].times,title: "Persons with Mild/Moderate Developmental/Intellectual Disabilities" 
      });
    });
  });
}


