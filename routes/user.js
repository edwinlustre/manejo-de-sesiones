const express = require('express');
const router = express.Router();
const userControllerSignup = require('../controllers/signup');
const userControllerLogin = require('../controllers/login');
const userControllerLogout = require('../controllers/logout');
const userControllerError = require('../controllers/error');
const userControllerStart = require('../controllers/start');
const userController = require('../controllers/registrousuario');
const modificationController = require('../controllers/modificacionusuario');

router.get('/signup', userControllerSignup.getSignup);
router.post('/signup', userControllerSignup.postSignup);

router.get('/login', userControllerLogin.getLogin);
router.post('/login', userControllerLogin.postLogin);

router.get('/logout', userControllerLogout.getLogout);

router.get('/error', userControllerError.getError);

router.get('/start', userControllerStart.getStart)

router.get('/profile', userController.getUserDetails);

router.get('/add-user', (req, res) => res.render('add-user'));
router.post('/add-user', userController.addUserDetails);
router.get('/update-user/:id', userController.getUpdateUserForm);
router.post('/update-user/:id', userController.updateUserDetails);
router.post('/delete-user', userController.deleteUserDetails);
router.get('/modifications', modificationController.getUserModifications);

module.exports = router;
