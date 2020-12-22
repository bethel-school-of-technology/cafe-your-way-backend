'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "customers", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "initial_migration",
    "created": "2020-12-03T03:13:41.056Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "customers",
        {
            "CustomerId": {
                "type": Sequelize.INTEGER,
                "field": "CustomerId",
                "primaryKey": true,
                "autoIncrement": true,
                "allowNull": false
            },
            "FirstName": {
                "type": Sequelize.STRING,
                "field": "FirstName"
            },
            "LastName": {
                "type": Sequelize.STRING,
                "field": "LastName"
            },
            "Email": {
                "type": Sequelize.STRING,
                "field": "Email",
                "unique": true
            },
            "Address1": {
                "type": Sequelize.STRING,
                "field": "Address1"
            },
            "Address2": {
                "type": Sequelize.STRING,
                "field": "Address2"
            },
            "City": {
                "type": Sequelize.STRING,
                "field": "City"
            },
            "State": {
                "type": Sequelize.STRING,
                "field": "State"
            },
            "ZipCode": {
                "type": Sequelize.STRING,
                "field": "ZipCode"
            },
            "PhoneNumber": {
                "type": Sequelize.STRING,
                "field": "PhoneNumber"
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
