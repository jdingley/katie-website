var express = require('express');
var router = express.Router();

const AdminPanelController = require('../controllers/AdminPanelController');

router.get('/AdminPanel', AdminPanelController.RenderAdminPanel);
router.get('/AdminPanel/EditQuote', AdminPanelController.RenderEditQuote);
router.post('/AdminPanel/PostQuote', AdminPanelController.PostEditQuote);
router.get('/AdminPanel/EditTime', AdminPanelController.RenderEditTime);
router.post('/AdminPanel/PostTime', AdminPanelController.PostEditTime);
router.get('/AdminPanel/AddBlog', AdminPanelController.RenderAddBlog);
router.post('/AdminPanel/PostBlog', AdminPanelController.PostBlog);

module.exports = router;
