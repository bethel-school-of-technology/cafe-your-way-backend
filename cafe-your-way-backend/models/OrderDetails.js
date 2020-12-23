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
<<<<<<< HEAD
      primaryKey: true,
=======
      primaryKey: false,
        // primaryKey: true,
>>>>>>> 78c426abab78cf7d0fe2a469d8c8a8c0087e45c9
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