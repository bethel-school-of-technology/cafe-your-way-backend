'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "id" from table "customers_users"
 * addColumn "Admin" to table "users"
 * addColumn "customer_id" to table "customers_users"
 * addColumn "user_id" to table "customers_users"
 *
 **/

var info = {
    "revision": 9,
    "name": "users_model_admin",
    "created": "2020-12-18T07:43:30.197Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["customers_users", "id"]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "Admin",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Admin"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "customers_users",
            "customer_id",
            {
                "type": Sequelize.INTEGER,
                "field": "customer_id",
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "customers",
                    "key": "CustomerId"
                },
                "primaryKey": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "customers_users",
            "user_id",
            {
                "type": Sequelize.INTEGER,
                "field": "user_id",
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "primaryKey": true
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
