'use strict';
import bcrypt from 'bcryptjs';
import { exclude } from 'utils/common';
const { Model, Op } = require('sequelize');
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
      google: DataTypes.STRING,
      facebook: DataTypes.STRING,
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

  User.addHook('beforeSave', async function (user) {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 12);
    }
  });

  User.isEmailTaken = async function (email, excludeUserId = null) {
    const user = await this.findOne({
      where: {
        [Op.and]: [
          { email },
          {
            id: {
              [Op.ne]: excludeUserId,
            },
          },
        ],
      },
    });
    return !!user;
  };
  User.prototype.isPasswordMatch = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.prototype.transform = function () {
    const excludedFields = ['password'];
    return exclude(this, excludedFields);
  };

  return User;
};
