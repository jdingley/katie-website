var express = require('express');
var router = express.Router();

const ServicesController = require('../controllers/ServicesController');

router.get('/Services', ServicesController.RenderServicesPage);
router.get('/MakePayements', ServicesController.RenderPaymentsPage);
router.get('/ConsentForms', ServicesController.RenderIntakePage);
router.get('/Services/AOF', ServicesController.RenderAreaOfFocusPage);
router.get('/Services/AOF/Preteens', ServicesController.RenderPreteens);
router.get('/Services/AOF/Teens', ServicesController.RenderTeens);
router.get('/Services/AOF/Adults', ServicesController.RenderAdults);
router.get('/Services/AOF/Elderly', ServicesController.RenderElderly);
router.get('/Services/AOF/Disabilities', ServicesController.RenderDisabilities);

module.exports = router;
