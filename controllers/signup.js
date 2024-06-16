const bcrypt = require('bcrypt');
const User = require('../models/users');

const userControllerSignup = {};

// Manejar la solicitud GET para la página de registro
userControllerSignup.getSignup = (req, res) => {
    res.render('signup');
};

// Manejar la solicitud POST para el registro
userControllerSignup.postSignup = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await User.create({ username, password: hashedPassword });
        res.redirect('/login');
    } catch (error) {
        res.send('Username already exists');
    }
};

module.exports = userControllerSignup;
