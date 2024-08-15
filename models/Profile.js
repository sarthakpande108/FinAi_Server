const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Profile = sequelize.define('Profile', {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  maritalStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING,
    defaultValue: 'India',
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aadharNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dependents: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

module.exports = Profile;
