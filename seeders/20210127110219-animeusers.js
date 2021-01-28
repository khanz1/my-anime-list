'use strict';
const animeusers = require('../database/animes_users.json')

module.exports = {
  up: (queryInterface, Sequelize) => {
    animeusers.forEach(anime => {
      delete anime.id;
      anime.createdAt = new Date();
      anime.updatedAt = new Date();
    })
    return queryInterface.bulkInsert('AnimeUsers', animeusers, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AnimeUsers', null, {});
  }
};
