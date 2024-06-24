const User = require('../models/users');

const userControllerStart = {};

userControllerStart.getStart = async (req, res) => {
    const user = await User.findByPk(req.session.userId);
    res.render('start', { user });
};

module.exports = userControllerStart;