'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Message);
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: false,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      point: { type: DataTypes.INTEGER, defaultValue: 0 },
      isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
      isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
      isBlocked: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
