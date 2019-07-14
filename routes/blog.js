var express = require('express');
var router = express.Router();

const BlogController = require('../controllers/BlogController');

router.get('/Blog', BlogController.RenderBlog);

module.exports = router;
