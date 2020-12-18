'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends sequelize.Model {
   
    static associate(models) {
      // define association here
    }
  };
  OrderDetails.init({
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
        // primaryKey: true,
        // autoIncrement: true,
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
        // autoIncrement: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, 
  {
    sequelize,
    modelName: 'OrderDetails',
  });
  return OrderDetails;
};