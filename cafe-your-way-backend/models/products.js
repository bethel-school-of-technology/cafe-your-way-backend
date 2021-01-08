'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class products extends sequelize.Model {

    static associate(models) {
      // define association here
    }
  };
  products.init({
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    ProductName: DataTypes.STRING,
    ProductPrice: DataTypes.DECIMAL(18, 2),
    ImageUrl: DataTypes.STRING,
    Deleted: DataTypes.BOOLEAN
  },
    {
      sequelize,
      modelName: 'products',
    });
  return products;
};
