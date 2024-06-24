const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const registrousuario = sequelize.define('registrousuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidopat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidomat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    num_telefono: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'registrousuario',
    timestamps: false
});

module.exports = registrousuario;
