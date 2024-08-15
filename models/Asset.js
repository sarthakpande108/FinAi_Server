const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Asset = sequelize.define('Asset', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  monthlyIncome: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  monthlyExpenditure: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currentSavings: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  emergencyFund: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  investments: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  insurance: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  loans: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

Asset.belongsTo(User, { foreignKey: 'userId' });

module.exports = Asset;
