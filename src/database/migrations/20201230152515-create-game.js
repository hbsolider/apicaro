'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      roomId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Rooms',
          key: 'id',
        },
      },
      playerFirst: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      playerSecond: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      userWin: {
        type: Sequelize.UUID,
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
      completeAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Games');
  },
};
