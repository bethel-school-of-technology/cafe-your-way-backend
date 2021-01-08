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
    UserId: {
      type: DataTypes.INTEGER,
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
      allowNull: false,
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    OrderTotal: DataTypes.DECIMAL(18, 2),
    OrderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Deleted: DataTypes.BOOLEAN
  },
    {
      sequelize,
      modelName: 'orders',
    });
  return orders;
};
