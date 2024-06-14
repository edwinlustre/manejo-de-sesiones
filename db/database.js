const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('store', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3310,
});

sequelize.authenticate()
    .then(() => console.log('Conexion establecida :).'))
    .catch(err => console.error('Ha ocurrido un error:', err));

module.exports = sequelize;