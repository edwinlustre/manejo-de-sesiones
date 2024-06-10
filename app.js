const express = require('express');
 const session = require('express-session');
 const bodyParser = require('body-parser');
 const bcrypt = require('bcrypt');
 const User = require('./models/users');
 const sessionStore = require('./sesion/sessionStore');
 const sequelize = require('./db/database');
const isAuthenticated = require('./middlewares/auth');
 const app = express();
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(session({
  secret: 'your_secret_key',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000 // 1 hora
  }
 }));
 // Sincronizar la base de datos
 sequelize.sync();
 // Rutas
 app.get('/', (req, res) => {
  res.send({
    msg: "Hola"
  });
 });
 app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({ username, password: hashedPassword });
    res.redirect('/login');
  } catch (error) {
    res.send('Username already exists');
  }
 });

 app.get('/login', (req, res) => {
  res.send({
    msg:"Entraste al login"
  });
 });

 app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user.id;
    res.redirect('/profile');
  } else {
    res.send('Invalid username or password');
  }
 });

 app.get('/profile', isAuthenticated, async (req, res) => {
  const user = await User.findByPk(req.session.userId);
  res.send({
    msg: "Entraste dentro del perfil"
  });
 });

 app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error logging out');
    }
    res.redirect('/');
  });
 });
 
 // Iniciar el servidor
 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`)
 });