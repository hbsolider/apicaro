'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
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
      point: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue:
          'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png',
      },
      isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
      isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
      isBlocked: { type: DataTypes.BOOLEAN, defaultValue: false },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
