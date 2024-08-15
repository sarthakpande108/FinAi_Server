const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_URL || '', {
  dialect: process.env.DB_DIALECT,
  protocol: 'mysql',
  logging: console.log,
  dialectOptions: {
    ssl: {
      require: true, // This will help to ensure SSL is used
      rejectUnauthorized: false, // For self-signed certificates
    },
  },
});

module.exports = sequelize;
