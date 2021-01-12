'use strict';

const fakeData = require('./fakeData');

const { messages } = fakeData;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Messages', [...messages], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Messages', null, {});
  },
};
