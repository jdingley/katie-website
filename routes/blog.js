var express = require('express');
var router = express.Router();
var butter = require('buttercms')('your_api_token');

const BlogController = require('../controllers/BlogController');

router.get('/Blog', BlogController.RenderBlog);
router.get('/Blog/:page', BlogController.RenderBlog);

module.exports = router;
