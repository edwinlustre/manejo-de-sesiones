const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('..db/database');

const User = sequelize.define('User', {
    username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
    },
    password: {
    type: DataTypes.STRING,
    allowNull: false
    }
},{
    sequelize,
    tableName: 'tablausuarios',
    timestamps: false

});

module.exports = User;