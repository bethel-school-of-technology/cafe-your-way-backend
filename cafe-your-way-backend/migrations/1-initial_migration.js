'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "products", deps: []
 * createTable "users", deps: []
 * createTable "orders", deps: [users]
 * createTable "orders_products", deps: [orders, products]
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2021-01-06T18:58:09.231Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "products",
            {
                "ProductId": {
                    "type": Sequelize.INTEGER,
                    "field": "ProductId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "ProductName": {
                    "type": Sequelize.STRING,
                    "field": "ProductName"
                },
                "ProductPrice": {
                    "type": Sequelize.DECIMAL(18, 2),
                    "field": "ProductPrice"
                },
                "ImageUrl": {
                    "type": Sequelize.STRING,
                    "field": "ImageUrl"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "users",
            {
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "FirstName": {
                    "type": Sequelize.STRING,
                    "field": "FirstName",
                    "allowNull": false
                },
                "LastName": {
                    "type": Sequelize.STRING,
                    "field": "LastName",
                    "allowNull": false
                },
                "Email": {
                    "type": Sequelize.STRING,
                    "field": "Email",
                    "allowNull": false,
                    "unique": true
                },
                "Address1": {
                    "type": Sequelize.STRING,
                    "field": "Address1",
                    "allowNull": false
                },
                "Address2": {
                    "type": Sequelize.STRING,
                    "field": "Address2",
                    "allowNull": false
                },
                "City": {
                    "type": Sequelize.STRING,
                    "field": "City",
                    "allowNull": false
                },
                "State": {
                    "type": Sequelize.STRING,
                    "field": "State",
                    "allowNull": false
                },
                "ZipCode": {
                    "type": Sequelize.STRING,
                    "field": "ZipCode",
                    "allowNull": false
                },
                "PhoneNumber": {
                    "type": Sequelize.STRING,
                    "field": "PhoneNumber",
                    "allowNull": false
                },
                "UserName": {
                    "type": Sequelize.STRING,
                    "field": "UserName",
                    "unique": true
                },
                "Password": {
                    "type": Sequelize.STRING,
                    "field": "Password"
                },
                "Admin": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Admin",
                    "default": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "orders",
            {
                "OrderId": {
                    "type": Sequelize.INTEGER,
                    "field": "OrderId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "users",
                        "key": "UserId"
                    },
                    "allowNull": true,
                    "field": "UserId"
                },
                "FirstName": {
                    "type": Sequelize.STRING,
                    "field": "FirstName",
                    "allowNull": false
                },
                "LastName": {
                    "type": Sequelize.STRING,
                    "field": "LastName",
                    "allowNull": false
                },
                "Email": {
                    "type": Sequelize.STRING,
                    "field": "Email",
                    "allowNull": false
                },
                "PhoneNumber": {
                    "type": Sequelize.STRING,
                    "field": "PhoneNumber",
                    "allowNull": false
                },
                "OrderTotal": {
                    "type": Sequelize.DECIMAL(18, 2),
                    "field": "OrderTotal"
                },
                "OrderDate": {
                    "type": Sequelize.DATE,
                    "field": "OrderDate",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "orders_products",
            {
                "OrderId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "unique": "orders_products_OrderId_ProductId_unique",
                    "field": "OrderId",
                    "references": {
                        "model": "orders",
                        "key": "OrderId"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "ProductId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "unique": "orders_products_OrderId_ProductId_unique",
                    "field": "ProductId",
                    "references": {
                        "model": "products",
                        "key": "ProductId"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "ProductName": {
                    "type": Sequelize.STRING,
                    "field": "ProductName"
                },
                "ProductPrice": {
                    "type": Sequelize.DECIMAL(18, 2),
                    "field": "ProductPrice"
                },
                "Quantity": {
                    "type": Sequelize.INTEGER,
                    "field": "Quantity",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
