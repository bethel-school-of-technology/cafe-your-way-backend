'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class users extends sequelize.Model {

    static associate(models) {
      // define association here
    }
  };
  
  users.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    PhysicalAddress: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    Email: {
      type: DataTypes.STRING,
      unique: true,
    },
    UserName: {
      type: DataTypes.STRING,
      unique: true,
    },
    Password: DataTypes.STRING,

<<<<<<< HEAD
    Admin: {
      type: DataTypes.BOOLEAN, default: false,
      // allowNull: false
    },
=======
    Admin: DataTypes.BOOLEAN
      // allowNull: false
>>>>>>> 78c426abab78cf7d0fe2a469d8c8a8c0087e45c9
  },
  {
    sequelize,
    modelName: 'users',
  
  });

  return users;
};
