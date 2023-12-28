const { DataTypes } = require('sequelize');

const db = require('../db/connection');

const User = require('./User');

const Tought = db.define('Tought', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

Tought.belongsTo(User);

module.exports = Tought;
