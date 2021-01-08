'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class orders_products extends sequelize.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        };
    };
    orders_products.init({
        OrderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'orders',
                key: 'OrderId'
            }
        },
        ProductId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'products',
                key: 'ProductId'
            }
        },
        ProductName: DataTypes.STRING,
        ProductPrice: DataTypes.DECIMAL(18, 2),
        Quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
        {
            sequelize,
            modelName: 'orders_products',
        });
    return orders_products;
};