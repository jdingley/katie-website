var express = require('express');
var router = express.Router();

const ContactController = require('../controllers/ContactController');

router.get('/Contact', ContactController.RenderContactPage);
router.get('/Schedule', ContactController.RenderSchedule);

module.exports = router;
