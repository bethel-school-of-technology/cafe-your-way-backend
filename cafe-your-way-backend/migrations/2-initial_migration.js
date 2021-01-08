'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Deleted" to table "orders"
 * addColumn "Deleted" to table "products"
 * addColumn "Deleted" to table "users"
 *
 **/

var info = {
    "revision": 2,
    "name": "initial_migration",
    "created": "2021-01-06T21:15:48.843Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "orders",
            "Deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "products",
            "Deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "Deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted"
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
