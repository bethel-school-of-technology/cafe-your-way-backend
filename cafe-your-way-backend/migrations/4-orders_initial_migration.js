'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "orders", deps: []
 *
 **/

var info = {
    "revision": 4,
    "name": "orders_initial_migration",
    "created": "2020-12-03T05:18:07.207Z",
    "comment": ""
};

var migrationCommands = [{
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
            "CustomerId": {
                "type": Sequelize.INTEGER,
                "field": "CustomerId"
            },
            "OrderDate": {
                "type": Sequelize.DATE,
                "field": "OrderDate"
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
}];

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
