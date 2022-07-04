const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');
const adminController = require('../controllers/admin.controller');
const masterController = require('../controllers/master.controller');

// client part
router.post('/client/signup', clientController.registerUser);
router.post('/client/signin', clientController.loginUser);

// master part
router.post('/master/signup', masterController.registerUser);
router.post('/master/signin', masterController.loginUser);

// admin part
router.post('/admin/signup', adminController.registerUser);
router.post('/admin/signin', adminController.loginUser);

module.exports = router;