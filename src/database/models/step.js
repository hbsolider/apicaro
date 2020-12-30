"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Step extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Game, { foreignKey: "gameId" });
    }
  }
  Step.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: false,
      },
      gameId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Game",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      board: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Step",
    }
  );
  return Step;
};
