'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class users extends sequelize.Model {

    static associate(models) {
      // define association here
    }
  };
  
  users.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    PhysicalAddress: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    Email: {
      type: DataTypes.STRING,
      unique: true,
    },
    UserName: {
      type: DataTypes.STRING,
      unique: true,
    },
    Password: DataTypes.STRING,

    Admin: {
      type: DataTypes.BOOLEAN, default: false,
      // allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'users',
  
  });

  return users;
};
