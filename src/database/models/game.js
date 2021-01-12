'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Room, { as: 'room', foreignKey: 'roomId' });
      this.belongsTo(models.User, {
        as: 'infoPlayerFirst',
        foreignKey: 'playerFirst',
      });
      this.belongsTo(models.User, {
        as: 'infoPlayerSecond',
        foreignKey: 'playerSecond',
      });
      this.hasMany(models.Step, { as: 'step', foreignKey: 'gameId' });
    }
  }
  Game.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: false,
      },
      roomId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Room',
          key: 'id',
        },
      },
      playerFirst: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      playerSecond: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userWin: {
        type: DataTypes.UUID,
      },
      completeAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Game',
    }
  );
  return Game;
};
