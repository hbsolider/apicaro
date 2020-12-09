"use strict";
const bycrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let users = [];
    const salt = bycrypt.genSaltSync(10);
    for (let i = 0; i < 10; i++) {
      let newpass = bycrypt.hashSync(`password${i}`, salt);
      users.push({
        id:uuidv4(),
        name: `People ${i}`,
        password: newpass,
        email: `baodeptrai${i}.gmail.com`,
        point: 0,
      });
    }
    await queryInterface.bulkInsert("users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
