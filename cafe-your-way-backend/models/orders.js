'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends sequelize.Model {
   
    static associate(models) {
      // define association here
    }
  };
  orders.init({
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    OrderDate: {
      type:  DataTypes.DATE,
      allowNull: false,
    },
  }, 
  {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};