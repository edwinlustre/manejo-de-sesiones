const UserModifications = require('../models/modificacionusuario');

exports.getUserModifications = async (req, res) => {
    const modifications = await UserModifications.findAll({ where: { user_id: req.session.userId } });
    res.render('user_modification', { modifications });
};
