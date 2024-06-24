const UserDetails = require('../models/registrousuario');
const UserModifications = require('../models/modificacionusuario');

exports.getUserDetails = async (req, res) => {
    try {
        const details = await UserDetails.findAll();
        res.render('profile', { details });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getUpdateUserForm = async (req, res) => {
    try {
        const user = await UserDetails.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('update-user', { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.addUserDetails = async (req, res) => {
    const { nombre, apellidopat, apellidomat, edad, sexo, num_telefono } = req.body;
    try {
        await UserDetails.create({ nombre, apellidopat, apellidomat, edad, sexo, num_telefono });
        await UserModifications.create({ user_id: req.session.userId, action: 'Created user details' });
        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateUserDetails = async (req, res) => {
    const { nombre, apellidopat, apellidomat, edad, sexo, num_telefono } = req.body;
    try {
        await UserDetails.update(
            { nombre, apellidopat, apellidomat, edad, sexo, num_telefono },
            { where: { id: req.params.id } }
        );
        await UserModifications.create({ user_id: req.session.userId, action: 'Updated user details' });
        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteUserDetails = async (req, res) => {
    const { id } = req.body;
    try {
        await UserDetails.destroy({ where: { id } });
        await UserModifications.create({ user_id: req.session.userId, action: 'Deleted user details' });
        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}