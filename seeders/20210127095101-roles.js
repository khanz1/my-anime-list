'use strict';
const roles = require('../database/roles.json')

module.exports = {
  up: (queryInterface, Sequelize) => {
    roles.forEach(role => {
      role.createdAt = new Date();
      role.updatedAt = new Date();
    })
    return queryInterface.bulkInsert('Roles', roles, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
