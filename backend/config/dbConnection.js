const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('word_count', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
