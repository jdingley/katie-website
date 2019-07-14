var express = require('express');
var router = express.Router();

const AboutController = require('../controllers/AboutController');

router.get('/About', AboutController.RenderAboutPage);

module.exports = router;
