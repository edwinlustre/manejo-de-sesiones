const express = require('express')
const router = express.Router()
//const user_services = require('../../services/users')

// Rutas
 router.get('/', (request, response) => {
    response.render('home',{
      msg: "Hola"
    });
});

module.exports = router