'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "customers_users", deps: []
 *
 **/

var info = {
    "revision": 8,
    "name": "customers_users_initial_migration",
    "created": "2020-12-14T09:24:51.939Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "customers_users",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "CustomerId": {
                "type": Sequelize.INTEGER,
                "field": "CustomerId",
                "allowNull": false
            },
            "UserId": {
                "type": Sequelize.INTEGER,
                "field": "UserId",
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
