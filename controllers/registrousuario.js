const UserDetails = require('../models/registrousuario');
const UserModifications = require('../models/modificacionusuario');

const userControllerRegistro = {};

userControllerRegistro.getUserDetails = async (req, res) => {
    try {
        const details = await UserDetails.findAll();
        res.render('profile', { details });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

userControllerRegistro.getUpdateUserForm = async (req, res) => {
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

userControllerRegistro.addUserDetails = async (req, res) => {
    const { nombre, apellidopat, apellidomat, edad, sexo, num_telefono } = req.body;
    try {
        const newUser = await UserDetails.create({ nombre, apellidopat, apellidomat, edad, sexo, num_telefono });
        await UserModifications.create({ user_id: req.session.userId, action: `El usuario ha creado un perfil con ID: ${newUser.id}` });
        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

userControllerRegistro.updateUserDetails = async (req, res) => {
    const { nombre, apellidopat, apellidomat, edad, sexo, num_telefono } = req.body;
    try {
        await UserDetails.update(
            { nombre, apellidopat, apellidomat, edad, sexo, num_telefono },
            { where: { id: req.params.id } }
        );
        await UserModifications.create({ user_id: req.session.userId, action: `El usuario ha actualizado el perfil con ID: ${req.params.id}` });
        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

userControllerRegistro.deleteUserDetails = async (req, res) => {
    const { id } = req.body;
    try {
        await UserDetails.destroy({ where: { id } });
        await UserModifications.create({ user_id: req.session.userId, action: `El usuario ha eliminado el perfil con ID: ${id}` });
        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = userControllerRegistro;
