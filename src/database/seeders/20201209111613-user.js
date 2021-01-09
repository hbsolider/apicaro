'use strict';

const fakeData = require('./fakeData');

const { user, defaultPassword } = fakeData;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: '18e8afec-887c-418e-b419-d997b8e9cf6f',
          email: 'admin@gmail.com',
          password: defaultPassword,
          name: 'Im AduvipAdmin',
          isAdmin: true,
          isActivated: true,
          isBlocked: false,
          point: 9999,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        ...user,
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
