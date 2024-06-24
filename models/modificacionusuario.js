const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const User = require('./users');

const modificacionusuario = sequelize.define('modificacionusuario', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'modificacionusuario',
    timestamps: false
});

module.exports = modificacionusuario;
