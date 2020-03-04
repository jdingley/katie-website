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
router.get('/AdminPanel/EditAdmin', AdminPanelController.EditAdmin);
router.post('/AdminPanel/PostAdmin', AdminPanelController.PostAdmin);
router.get('/AdminPanel/AddCerts', AdminPanelController.AddCerts);
router.post('/AdminPanel/PostCerts', AdminPanelController.PostCerts);
router.post('/Auth', AdminPanelController.Auth);
router.get('/AdminLogin', AdminPanelController.RenderAdminLogin);

module.exports = router;
