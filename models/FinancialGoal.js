const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const FinancialGoal = sequelize.define('FinancialGoal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  goal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  targetAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});

module.exports = FinancialGoal;
