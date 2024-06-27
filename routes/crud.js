const express = require('express');
const router = express.Router();
const userControllerRegistro = require('../controllers/registrousuario');
const userControllerModificacion = require('../controllers/modificacionusuario');

router.get('/add-user', (req, res) => res.render('add-user'));
router.post('/add-user', userControllerRegistro.addUserDetails);
router.get('/update-user/:id', userControllerRegistro.getUpdateUserForm);
router.post('/update-user/:id',userControllerRegistro.updateUserDetails);
router.post('/delete-user', userControllerRegistro.deleteUserDetails);
router.get('/modifications', userControllerModificacion.getUserModifications);
router.get('/modificationall', userControllerModificacion.getAllModifications);

module.exports = router;