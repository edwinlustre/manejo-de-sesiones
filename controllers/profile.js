const User = require('../models/users');

const userControllerProfile = {};

userControllerProfile.getProfile = async (req, res) => {
    const user = await User.findByPk(req.session.userId);
    res.render('profile', { user });
};

module.exports = userControllerProfile;
