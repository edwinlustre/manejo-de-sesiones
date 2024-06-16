const express = require('express');
const router = express.Router();
const userControllerSignup = require('../controllers/signup');
const userControllerLogin = require('../controllers/login');
const userControllerLogout = require('../controllers/logout');
const userControllerProfile = require('../controllers/profile');
const userControllerError = require('../controllers/error');
const isAuthenticated = require('../middlewares/auth');

router.get('/signup', userControllerSignup.getSignup);
router.post('/signup', userControllerSignup.postSignup);

router.get('/login', userControllerLogin.getLogin);
router.post('/login', userControllerLogin.postLogin);

router.get('/profile', isAuthenticated, userControllerProfile.getProfile);

router.get('/logout', userControllerLogout.getLogout);

router.get('/error', userControllerError.getError);

module.exports = router;
