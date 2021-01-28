'use strict';
const animes = require('../database/animes.json')

module.exports = {
  up: (queryInterface, Sequelize) => {
    animes.forEach(anime => {
      delete anime.id;
      anime.createdAt = new Date();
      anime.updatedAt = new Date();
    })
    return queryInterface.bulkInsert('Animes', animes, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Animes', null, {});
  }
};
