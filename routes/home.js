const express = require('express')
const router = express.Router()
//const user_services = require('../../services/users')

// Rutas
 router.get('/', (req, res) => {
    res.send({
      msg: "Hola"
    });
});