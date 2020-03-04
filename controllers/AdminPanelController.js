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

exports.RenderAdminPanel = function(req, res, next) {
  db.getConnection (function (err, connection) {
			async.parallel ([
				function(cb) { 
					db.query('SELECT id, author, title, content, DATE_FORMAT(date, "%a %b, %d %Y") AS "date" FROM blog_posts', cb) 
				},
				function(cb) {
					db.query('SELECT * FROM availability', cb)
				},    
				function(cb) { 
					db.query('SELECT * FROM quotes', cb) 
				},
			],
			function(error, results, fields) {
				if (req.session.loggedin) {
					res.render('Admin Panel/admin_panel', 
					{ 
						loggedin: req.session.loggedin,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Admin Panel" 
					});
				} else {
					res.render('Home/home_page', 
					{ 
						loggedin: req.session.loggedin,
						message: 3,
						quote1: results[2][0][0].quote,
						author1: results[2][0][0].author,
						quote2: results[2][0][1].quote,
						author2: results[2][0][1].author,
						quote3: results[2][0][2].quote,
						author3: results[2][0][2].author,
						quote4: results[2][0][3].quote,
						author4: results[2][0][3].author,
						quote5: results[2][0][4].quote,
						author5: results[2][0][4].author,
						quote6: results[2][0][5].quote,
						author6: results[2][0][5].author,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Home" 
					});
				}			
			});
	});
}
exports.RenderEditQuote = function(req, res, next) {
  db.getConnection (function (err, connection) {
			async.parallel ([
				function(cb) { 
					db.query('SELECT id, author, title, content, DATE_FORMAT(date, "%a %b, %d %Y") AS "date" FROM blog_posts', cb) 
				},
				function(cb) {
					db.query('SELECT * FROM availability', cb)
				},    
				function(cb) { 
					db.query('SELECT * FROM quotes', cb) 
				},
			],
			function(error, results, fields) {
				if (req.session.loggedin) {
					res.render('Admin Panel/edit_quote', 
					{ 
						loggedin: req.session.loggedin,
						message: 0,
						quote1: results[2][0][0].quote,
						author1: results[2][0][0].author,
						quote2: results[2][0][1].quote,
						author2: results[2][0][1].author,
						quote3: results[2][0][2].quote,
						author3: results[2][0][2].author,
						quote4: results[2][0][3].quote,
						author4: results[2][0][3].author,
						quote5: results[2][0][4].quote,
						author5: results[2][0][4].author,
						quote6: results[2][0][5].quote,
						author6: results[2][0][5].author,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Edit Quotes" 
					});
				} else {
					res.render('Home/home_page', 
					{ 
						loggedin: req.session.loggedin,
						message: 3,
						quote1: results[2][0][0].quote,
						author1: results[2][0][0].author,
						quote2: results[2][0][1].quote,
						author2: results[2][0][1].author,
						quote3: results[2][0][2].quote,
						author3: results[2][0][2].author,
						quote4: results[2][0][3].quote,
						author4: results[2][0][3].author,
						quote5: results[2][0][4].quote,
						author5: results[2][0][4].author,
						quote6: results[2][0][5].quote,
						author6: results[2][0][5].author,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Home" 
					});
				}			
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
				},    
				function(cb) { 
					db.query('SELECT * FROM quotes', cb) 
				},
			],
			function(error, results, fields) {
				if (req.session.loggedin) {
					res.render('Admin Panel/edit_time', 
					{ 
						loggedin: req.session.loggedin,
						message: 0,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Edit Time" 
					});
				} else {
					res.render('Home/home_page', 
					{ 
						loggedin: req.session.loggedin,
						message: 3,
						quote1: results[2][0][0].quote,
						author1: results[2][0][0].author,
						quote2: results[2][0][1].quote,
						author2: results[2][0][1].author,
						quote3: results[2][0][2].quote,
						author3: results[2][0][2].author,
						quote4: results[2][0][3].quote,
						author4: results[2][0][3].author,
						quote5: results[2][0][4].quote,
						author5: results[2][0][4].author,
						quote6: results[2][0][5].quote,
						author6: results[2][0][5].author,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Home" 
					});
				}			
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
				},    
				function(cb) { 
					db.query('SELECT * FROM quotes', cb) 
				},
			],
			function(error, results, fields) {
				if (req.session.loggedin) {
					res.render('Admin Panel/add_blog', 
					{ 
						loggedin: req.session.loggedin,
						message: 0,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Add Blog" 
					});
				} else {
					res.render('Home/home_page', 
					{ 
						loggedin: req.session.loggedin,
						message: 3,
						quote1: results[2][0][0].quote,
						author1: results[2][0][0].author,
						quote2: results[2][0][1].quote,
						author2: results[2][0][1].author,
						quote3: results[2][0][2].quote,
						author3: results[2][0][2].author,
						quote4: results[2][0][3].quote,
						author4: results[2][0][3].author,
						quote5: results[2][0][4].quote,
						author5: results[2][0][4].author,
						quote6: results[2][0][5].quote,
						author6: results[2][0][5].author,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Home" 
					});
				}			
			});
	});
}

exports.PostEditQuote = function(req, res, next) {
  db.getConnection (function (err, connection) {
			async.parallel ([
				function(cb) { 
					db.query('Update quotes SET quote = '+connection.escape(req.body.quote1)+', author = '+connection.escape(req.body.author1)+' WHERE id = 1', cb) 
				},
				function(cb) { 
					db.query('Update quotes SET quote = '+connection.escape(req.body.quote2)+', author = '+connection.escape(req.body.author2)+' WHERE id = 2', cb) 
				},
				function(cb) { 
					db.query('Update quotes SET quote = '+connection.escape(req.body.quote3)+', author = '+connection.escape(req.body.author3)+' WHERE id = 3', cb) 
				},
				function(cb) { 
					db.query('Update quotes SET quote = '+connection.escape(req.body.quote4)+', author = '+connection.escape(req.body.author4)+' WHERE id = 4', cb) 
				},
				function(cb) { 
					db.query('Update quotes SET quote = '+connection.escape(req.body.quote5)+', author = '+connection.escape(req.body.author5)+' WHERE id = 5', cb) 
				},
				function(cb) { 
					db.query('Update quotes SET quote = '+connection.escape(req.body.quote6)+', author = '+connection.escape(req.body.author6)+' WHERE id = 6', cb) 
				},
				function(cb) {
					db.query('SELECT * FROM availability', cb)
				},    
				function(cb) { 
					db.query('SELECT * FROM quotes', cb) 
				},
			],
			function(error, results, fields) {
				if (req.session.loggedin) {

					res.render('Admin Panel/edit_quote', 
					{ 
						loggedin: req.session.loggedin,
						message: 1,
						quote1: results[7][0][0].quote,
						author1: results[7][0][0].author,
						quote2: results[7][0][1].quote,
						author2: results[7][0][1].author,
						quote3: results[7][0][2].quote,
						author3: results[7][0][2].author,
						quote4: results[7][0][3].quote,
						author4: results[7][0][3].author,
						quote5: results[7][0][4].quote,
						author5: results[7][0][4].author,
						quote6: results[7][0][5].quote,
						author6: results[7][0][5].author,
						monday_time: results[6][0][0].times,
						tuesday_time: results[6][0][1].times,
						wednesday_time: results[6][0][2].times,
						thursday_time: results[6][0][3].times,
						friday_time: results[6][0][4].times,
						saturday_time: results[6][0][5].times,
						sunday_time: results[6][0][6].times,
						title: "Edit Quotes" 
					});
				} else {
					res.render('Home/home_page', 
					{ 
						loggedin: req.session.loggedin,
						message: 3,
						quote1: results[7][0][0].quote,
						author1: results[7][0][0].author,
						quote2: results[7][0][1].quote,
						author2: results[7][0][1].author,
						quote3: results[7][0][2].quote,
						author3: results[7][0][2].author,
						quote4: results[7][0][3].quote,
						author4: results[7][0][3].author,
						quote5: results[7][0][4].quote,
						author5: results[7][0][4].author,
						quote6: results[7][0][5].quote,
						author6: results[7][0][5].author,
						monday_time: results[6][0][0].times,
						tuesday_time: results[6][0][1].times,
						wednesday_time: results[6][0][2].times,
						thursday_time: results[6][0][3].times,
						friday_time: results[6][0][4].times,
						saturday_time: results[6][0][5].times,
						sunday_time: results[6][0][6].times,
						title: "Home" 
					});
				}			
			});
	});
}
exports.PostEditTime = function(req, res, next) {
  db.getConnection (function (err, connection) {
			async.parallel ([
				function(cb) { 
					db.query('Update availability SET times = '+connection.escape(req.body.monday_time)+' WHERE id = 1', cb) 
				},
				function(cb) { 
					db.query('Update availability SET times = '+connection.escape(req.body.tuesday_time)+' WHERE id = 2', cb) 
				},
				function(cb) { 
					db.query('Update availability SET times = '+connection.escape(req.body.wednesday_time)+' WHERE id = 3', cb) 
				},
				function(cb) { 
					db.query('Update availability SET times = '+connection.escape(req.body.thursday_time)+' WHERE id = 4', cb) 
				},
				function(cb) { 
					db.query('Update availability SET times = '+connection.escape(req.body.friday_time)+' WHERE id = 5', cb) 
				},
				function(cb) { 
					db.query('Update availability SET times = '+connection.escape(req.body.saturday_time)+' WHERE id = 6', cb) 
				},
				function(cb) { 
					db.query('Update availability SET times = '+connection.escape(req.body.sunday_time)+' WHERE id = 7', cb) 
				},
				function(cb) {
					db.query('SELECT * FROM availability', cb)
				},    
				function(cb) { 
					db.query('SELECT * FROM quotes', cb) 
				},
			],
			function(error, results, fields) {
				if (req.session.loggedin) {
					res.render('Admin Panel/edit_time', 
					{ 
						loggedin: req.session.loggedin,
						message: 1,
						monday_time: results[7][0][0].times,
						tuesday_time: results[7][0][1].times,
						wednesday_time: results[7][0][2].times,
						thursday_time: results[7][0][3].times,
						friday_time: results[7][0][4].times,
						saturday_time: results[7][0][5].times,
						sunday_time: results[7][0][6].times,
						title: "Edit Times" 
					});
				} else {
					res.render('Home/home_page', 
					{ 
						loggedin: req.session.loggedin,
						message: 3,
						quote1: results[8][0][0].quote,
						author1: results[8][0][0].author,
						quote2: results[8][0][1].quote,
						author2: results[8][0][1].author,
						quote3: results[8][0][2].quote,
						author3: results[8][0][2].author,
						quote4: results[8][0][3].quote,
						author4: results[8][0][3].author,
						quote5: results[8][0][4].quote,
						author5: results[8][0][4].author,
						quote6: results[8][0][5].quote,
						author6: results[8][0][5].author,
						monday_time: results[7][0][0].times,
						tuesday_time: results[7][0][1].times,
						wednesday_time: results[7][0][2].times,
						thursday_time: results[7][0][3].times,
						friday_time: results[7][0][4].times,
						saturday_time: results[7][0][5].times,
						sunday_time: results[7][0][6].times,
						title: "Home" 
					});
				}			
			});
	});
}
exports.PostBlog = function(req, res, next) {
    db.getConnection (function (err, connection) {
			async.parallel ([
				function(cb) { 
					db.query('INSERT INTO blog_posts (author, title, content, date) VALUES ('+connection.escape(req.body.author)+', '+connection.escape(req.body.title)+', '+connection.escape(req.body.blogcontent)+', NOW())', cb) 
				},
				function(cb) {
					db.query('SELECT * FROM availability', cb)
				},    
				function(cb) { 
					db.query('SELECT * FROM quotes', cb) 
				},
			],
			function(error, results, fields) {
				if (req.session.loggedin) {
					res.render('Admin Panel/add_blog', 
					{ 
						loggedin: req.session.loggedin,
						message: 1,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Add Blog Post" 
					});
				} else {
					res.render('Home/home_page', 
					{ 
						loggedin: req.session.loggedin,
						message: 3,
						quote1: results[2][0][0].quote,
						author1: results[2][0][0].author,
						quote2: results[2][0][1].quote,
						author2: results[2][0][1].author,
						quote3: results[2][0][2].quote,
						author3: results[2][0][2].author,
						quote4: results[2][0][3].quote,
						author4: results[2][0][3].author,
						quote5: results[2][0][4].quote,
						author5: results[2][0][4].author,
						quote6: results[2][0][5].quote,
						author6: results[2][0][5].author,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Home" 
					});
				}			
			});
	});
}
exports.EditAdmin = function(req, res, next) {
    db.getConnection (function (err, connection) {
			async.parallel ([
				function(cb) { 
					db.query('SELECT * FROM users WHERE id = 1', cb) 
				},
				function(cb) {
					db.query('SELECT * FROM availability', cb)
				},    
				function(cb) { 
					db.query('SELECT * FROM quotes', cb) 
				},
			],
			function(error, results, fields) {
				if (req.session.loggedin) {
					res.render('Admin Panel/edit_admin', 
					{ 
						loggedin: req.session.loggedin,
						message: 0,
						username: results[0][0][0].user_name,
						password: results[0][0][0].passwords,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Add Blog Posts" 
					});
				} else {
					res.render('Home/home_page', 
					{ 
						loggedin: req.session.loggedin,
						message: 3,
						quote1: results[2][0][0].quote,
						author1: results[2][0][0].author,
						quote2: results[2][0][1].quote,
						author2: results[2][0][1].author,
						quote3: results[2][0][2].quote,
						author3: results[2][0][2].author,
						quote4: results[2][0][3].quote,
						author4: results[2][0][3].author,
						quote5: results[2][0][4].quote,
						author5: results[2][0][4].author,
						quote6: results[2][0][5].quote,
						author6: results[2][0][5].author,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Home" 
					});
				}			
			});
	});
}
exports.AddCerts = function(req, res, next) {
  db.getConnection (function (err, connection) {
			async.parallel ([
				function(cb) { 
					db.query('SELECT id, author, title, content, DATE_FORMAT(date, "%a %b, %d %Y") AS "date" FROM blog_posts', cb) 
				},
				function(cb) {
					db.query('SELECT * FROM availability', cb)
				},    
				function(cb) { 
					db.query('SELECT * FROM quotes', cb) 
				},
			],
			function(error, results, fields) {
				if (req.session.loggedin) {
					res.render('Admin Panel/add_certs', 
					{ 
						loggedin: req.session.loggedin,
						message: 0,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Add Certifications" 
					});
				} else {
					res.render('Home/home_page', 
					{ 
						loggedin: req.session.loggedin,
						message: 3,
						quote1: results[2][0][0].quote,
						author1: results[2][0][0].author,
						quote2: results[2][0][1].quote,
						author2: results[2][0][1].author,
						quote3: results[2][0][2].quote,
						author3: results[2][0][2].author,
						quote4: results[2][0][3].quote,
						author4: results[2][0][3].author,
						quote5: results[2][0][4].quote,
						author5: results[2][0][4].author,
						quote6: results[2][0][5].quote,
						author6: results[2][0][5].author,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Home" 
					});
				}			
			});
	});
}
exports.PostAdmin = function(req, res, next) {
    db.getConnection (function (err, connection) {
			async.parallel ([
				function(cb) { 
					db.query('UPDATE users SET user_name = '+connection.escape(req.body.username)+', passwords = '+connection.escape(req.body.password)+' WHERE id = 1', cb) 
				},
				function(cb) {
					db.query('SELECT * FROM availability', cb)
				},    
				function(cb) { 
					db.query('SELECT * FROM quotes', cb) 
				},
			],
			function(error, results, fields) {
				if (req.session.loggedin) {
					res.render('Admin Panel/edit_admin', 
					{ 
						loggedin: req.session.loggedin,
						message: 1,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Add Blog Posts" 
					});
				} else {
					res.render('Home/home_page', 
					{ 
						loggedin: req.session.loggedin,
						message: 3,
						quote1: results[2][0][0].quote,
						author1: results[2][0][0].author,
						quote2: results[2][0][1].quote,
						author2: results[2][0][1].author,
						quote3: results[2][0][2].quote,
						author3: results[2][0][2].author,
						quote4: results[2][0][3].quote,
						author4: results[2][0][3].author,
						quote5: results[2][0][4].quote,
						author5: results[2][0][4].author,
						quote6: results[2][0][5].quote,
						author6: results[2][0][5].author,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Home" 
					});
				}			
			});
	});
}
exports.PostCerts = function(req, res, next) {
  db.getConnection (function (err, connection) {
			async.parallel ([
				function(cb) { 
					db.query('INSERT INTO certifications (qualification_name, type) VALUES ('+connection.escape(req.body.qualification_name)+', '+connection.escape(req.body.type)+')', cb) 
				},
				function(cb) {
					db.query('SELECT * FROM availability', cb)
				},    
				function(cb) { 
					db.query('SELECT * FROM quotes', cb) 
				},
			],
			function(error, results, fields) {
				if (req.session.loggedin) {
					res.render('Admin Panel/add_certs', 
					{ 
						loggedin: req.session.loggedin,
						message: 1,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Add Certifications" 
					});
				} else {
					res.render('Home/home_page', 
					{ 
						loggedin: req.session.loggedin,
						message: 3,
						quote1: results[2][0][0].quote,
						author1: results[2][0][0].author,
						quote2: results[2][0][1].quote,
						author2: results[2][0][1].author,
						quote3: results[2][0][2].quote,
						author3: results[2][0][2].author,
						quote4: results[2][0][3].quote,
						author4: results[2][0][3].author,
						quote5: results[2][0][4].quote,
						author5: results[2][0][4].author,
						quote6: results[2][0][5].quote,
						author6: results[2][0][5].author,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Home" 
					});
				}			
			});
	});
}
exports.Auth = function(req, res, next) {
	var username = req.body.user_name;
	var password = req.body.password;
	if (username && password) {
		db.getConnection (function (err, connection) {
			async.parallel ([
				function(cb) { 
					db.query('SELECT * FROM users WHERE user_name = ? AND passwords = ?', [username, password], cb) 
				},
				function(cb) {
					db.query('SELECT * FROM availability', cb)
				},    
				function(cb) { 
					db.query('SELECT * FROM quotes', cb) 
				},
			],
			function(error, results, fields) {
				if (results[0][0].length > 0) {
					req.session.loggedin = true;
					req.session.username = username;
					res.render('Home/home_page', 
					{ 
						loggedin: req.session.loggedin,
						message: 2,
						quote1: results[2][0][0].quote,
						author1: results[2][0][0].author,
						quote2: results[2][0][1].quote,
						author2: results[2][0][1].author,
						quote3: results[2][0][2].quote,
						author3: results[2][0][2].author,
						quote4: results[2][0][3].quote,
						author4: results[2][0][3].author,
						quote5: results[2][0][4].quote,
						author5: results[2][0][4].author,
						quote6: results[2][0][5].quote,
						author6: results[2][0][5].author,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Home" 
					});
				} else {
					req.session.loggedin = false;
					res.render('Home/home_page', 
					{ 
						loggedin: req.session.loggedin,
						message: 1,
						quote1: results[2][0][0].quote,
						author1: results[2][0][0].author,
						quote2: results[2][0][1].quote,
						author2: results[2][0][1].author,
						quote3: results[2][0][2].quote,
						author3: results[2][0][2].author,
						quote4: results[2][0][3].quote,
						author4: results[2][0][3].author,
						quote5: results[2][0][4].quote,
						author5: results[2][0][4].author,
						quote6: results[2][0][5].quote,
						author6: results[2][0][5].author,
						monday_time: results[1][0][0].times,
						tuesday_time: results[1][0][1].times,
						wednesday_time: results[1][0][2].times,
						thursday_time: results[1][0][3].times,
						friday_time: results[1][0][4].times,
						saturday_time: results[1][0][5].times,
						sunday_time: results[1][0][6].times,
						title: "Home" 
					});
				}			
				res.end();
			});
		});
	} 
	else {
		req.session.loggedin = false;
		res.redirect('/AdminLogin/?message=1');
		res.end();
	}
}
exports.RenderAdminLogin = function(req, res, next) {
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
        connection.release();
        if (error) throw error;
				var session = req.session;
        res.render('Admin Panel/admin_login',
        { 
          loggedin: req.session.loggedin,
          message: req.query.message,
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