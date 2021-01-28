'use strict';
const users = require('../database/users.json')
const { hashing } = require("../helper/hash")
module.exports = {
  up: (queryInterface, Sequelize) => {
    users.forEach(user => {
      delete user.id;
      user.createdAt = new Date();
      user.updatedAt = new Date();
      user.password = hashing(user.password);
      user.is_verified = false;
    })
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
