const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('../db/database');

const sessionStore = new SequelizeStore({
    db: sequelize,
});

sessionStore.sync(); // Sincroniza el almacén de sesiones con la base de datos
module.exports = sessionStore;