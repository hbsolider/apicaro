"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Steps", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      gameId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Games",
          key: "id",
        },
      },
      board: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Steps");
  },
};
