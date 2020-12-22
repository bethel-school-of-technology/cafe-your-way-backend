'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "id" from table "OrderDetails"
 * changeColumn "OrderId" on table "OrderDetails"
 * changeColumn "Admin" on table "users"
 *
 **/

var info = {
    "revision": 10,
    "name": "users_model_admin_migration2",
    "created": "2020-12-22T07:55:55.041Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["OrderDetails", "id"]
    },
    {
        fn: "changeColumn",
        params: [
            "OrderDetails",
            "OrderId",
            {
                "type": Sequelize.INTEGER,
                "field": "OrderId",
                "primaryKey": true,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "Admin",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Admin",
                "default": false
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
