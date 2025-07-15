const express = require('express');
const router = express.Router();
const authController= require('../controllers/authController');
const userController = require('../controllers/userController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/farmers', userController.getFarmers);
router.get('/traders', userController.getTraders);
router.post('/farmers', userController.createFarmer);
router.post('/traders', userController.createTrader);

module.exports = router;