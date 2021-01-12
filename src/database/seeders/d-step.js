'use strict';

const fakeData = require('./fakeData');

const { steps } = fakeData;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Steps', [...steps], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Steps', null, {});
  },
};
