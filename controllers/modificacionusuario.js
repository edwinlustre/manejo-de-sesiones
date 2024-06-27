const UserModifications = require('../models/modificacionusuario');

const userControllerModificacion = {};

userControllerModificacion.getUserModifications = async (req, res) => {
    const modifications = await UserModifications.findAll({ where: { user_id: req.session.userId } });
    res.render('user_modification', { modifications });
};

userControllerModificacion.getAllModifications = async (req, res) => {
    const modifications = await UserModifications.findAll();
    res.render('user_modificationall', { modifications });
};

module.exports =  userControllerModificacion;
