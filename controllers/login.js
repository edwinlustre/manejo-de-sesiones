const bcrypt = require('bcrypt');
const User = require('../models/users');

const userControllerLogin = {};

userControllerLogin.getLogin = (req, res) => {
    res.render('login');
};

userControllerLogin.postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user.id;
        res.redirect('/profile');
    } else {
        res.redirect('/error');
    }
};

module.exports = userControllerLogin;
