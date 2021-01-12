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
          avatar:
            'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'fb0f2ae9-d8a4-4a82-a5f2-9993e23b71a9',
          email: 'lem@gmail.com',
          password: defaultPassword,
          name: 'Lem Dep Trai',
          isAdmin: false,
          isActivated: true,
          isBlocked: false,
          point: 126,
          avatar:
            'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'eb9de1bd-b9a1-44ac-9e64-6189cd2c65e3',
          email: 'tri@gmail.com',
          password: defaultPassword,
          name: 'Tri Thanh Lich',
          isAdmin: false,
          isActivated: true,
          isBlocked: false,
          point: 119,
          avatar:
            'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png',
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
