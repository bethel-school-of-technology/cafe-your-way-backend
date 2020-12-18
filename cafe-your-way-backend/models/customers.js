'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class customers extends sequelize.Model {
   
    static associate(models) {
      // define association here
    }
  };

  customers.init({
    CustomerId: {
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
      allowNull:  false,
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
    allowNull: true,
    },
    PhoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  }, 
  {
    sequelize,
    modelName: 'customers',
  });

  return customers;
};