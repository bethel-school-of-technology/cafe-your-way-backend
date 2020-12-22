'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "products", deps: []
 *
 **/

var info = {
    "revision": 3,
    "name": "products_initial_migration",
    "created": "2020-12-03T04:50:04.557Z",
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
                "field": "ProductName",
                "alllowNull": false,
             
            },
            "ProductPrice": {
                "type": Sequelize.DECIMAL(18, 2),
                "field": "ProductPrice",
                "allowNull": false,
               
            },
            "ImageUrl": {
                "type": Sequelize.STRING,
                "field": "ImageUrl",
                "allowNull": false,
         
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
