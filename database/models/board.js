'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      board.belongsTo(models.user, { foreignKey: 'userId' });
    }
  }
  board.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'board',
    }
  );
  return board;
};
