var express = require('express');
var router = express.Router();

const ServicesController = require('../controllers/ServicesController');

router.get('/Services', ServicesController.RenderServicesPage);
router.get('/MakePayements', ServicesController.RenderPaymentsPage);
router.get('/ConsentForms', ServicesController.RenderIntakePage);

module.exports = router;
