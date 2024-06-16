//* Modulos requeridos
const express = require('express');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const sessionStore = require('./sesion/sessionStore');
const sequelize = require('./db/database');
const authRoutes = require('./routes/user.js');
const app = express();

//! Configuracion de la app

//* Configuracion de la App
app.set('puerto', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))
app.set('views', './views');

//? Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(morgan('dev'))
//app.use(bodyParser.urlencoded({ extended: true }));


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
app.use(authRoutes);

app.get('/', (req, res) => {
  res.render('home', { userId: req.session.userId });
});

 
//! Starting server
app.listen( app.get('puerto'), async()=>{
  const ports =
  console.log(`Server: http://localhost:${app.get('puerto')}`)
  await sequelize.sync({force : false})
  .then (()=>{
      console.log('Está conectado a la base de datos con Sequelize');
  }).catch((errpr)=>{
      console.log('Error al conectarse :(', error);
  })
})