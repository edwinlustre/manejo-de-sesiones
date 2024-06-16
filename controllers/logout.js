const userControllerLogout = {};

userControllerLogout.getLogout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('Error logging out');
        }
        res.redirect('/');
    });
};

module.exports = userControllerLogout;
