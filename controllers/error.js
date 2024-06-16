const userControllerError = {};

userControllerError.getError = (req, res) => {
    res.render('error');
};

module.exports = userControllerError;
