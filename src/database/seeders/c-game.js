'use strict';

const fakeData = require('./fakeData');

const { game } = fakeData;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Games', [...game], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Games', null, {});
  },
};
