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
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    Address1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Address2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    State: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ZipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserName: {
      type: DataTypes.STRING,
      unique: true,
    },
    Password: DataTypes.STRING,

    Admin: {
      type: DataTypes.BOOLEAN, default: false,
    },
    Deleted: DataTypes.BOOLEAN
  },
    {
      sequelize,
      modelName: 'users',

    });

  return users;
};

