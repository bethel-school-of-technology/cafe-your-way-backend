'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "OrderDetails", deps: []
 * changeColumn "OrderDate" on table "orders"
 *
 **/

var info = {
    "revision": 5,
    "name": "orderdetails_initial_migration",
    "created": "2020-12-03T06:07:39.728Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "OrderDetails",
            {
                "OrderId": {
                    "type": Sequelize.INTEGER,
                    "field": "OrderId",
                    "primaryKey": true,
                    "autoIncrement": false,
                    "allowNull": false
                },
                "ProductId": {
                    "type": Sequelize.INTEGER,
                    "field": "ProductId",
                    "primaryKey": false,
                    "allowNull": false
                },
                "Quantity": {
                    "type": Sequelize.INTEGER,
                    "field": "Quantity"
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
        fn: "changeColumn",
        params: [
            "orders",
            "OrderDate",
            {
                "type": Sequelize.DATE,
                "field": "OrderDate",
                "allowNull": false
            }
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
