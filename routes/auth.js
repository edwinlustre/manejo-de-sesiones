const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const isAuthenticated = require('../middlewares/auth');
const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await User.create({ username, password: hashedPassword });
        res.redirect('/login');
    } catch (error) {
        res.send('Username already exists');
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user.id;
        res.redirect('/profile');
    } else {
        res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Página de Ejemplo</title>
        </head>
        <body>
            <h1>Haz tenido un error en el usuario o contraseña</h1>
            <p>Este es un ejemplo de cómo enviar HTML utilizando res.send() en Express.</p>
        </body>
        </html>
    `);
    }
});

router.get('/profile', isAuthenticated, async (req, res) => {
    const user = await User.findByPk(req.session.userId);
    res.render('profile', { user });
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('Error logging out');
        }
        res.redirect('/');
    });
});

module.exports = router;
