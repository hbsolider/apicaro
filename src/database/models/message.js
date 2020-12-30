"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.Room, { foreignKey: "roomId" });
    }
  }
  Message.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: false,
      },
      content: DataTypes.STRING,
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      roomId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Room",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
