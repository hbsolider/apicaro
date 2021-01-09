'use strict';

const fakeData = require('./fakeData');

const { room } = fakeData;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Rooms', [...room], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Rooms', null, {});
  },
};
