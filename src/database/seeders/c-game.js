'use strict';

const fakeData = require('./fakeData');

const { game, room } = fakeData;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Games',
      [
        {
          id: 'b7f8f6f9-a7f5-4f75-af60-2bb0a4394ba9',
          roomId: room[0].id,
          playerFirst: 'fb0f2ae9-d8a4-4a82-a5f2-9993e23b71a9',
          playerSecond: 'eb9de1bd-b9a1-44ac-9e64-6189cd2c65e3',
          userWin: 'fb0f2ae9-d8a4-4a82-a5f2-9993e23b71a9',
          createdAt: new Date('2021-01-12T20:27:08'),
          updatedAt: new Date('2021-01-12T20:27:08'),
          completeAt: new Date('2021-01-12T21:27:08'),
        },
        ...game,
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Games', null, {});
  },
};
