'use strict';
const genres = require('../database/genres.json')

module.exports = {
  up: (queryInterface, Sequelize) => {
    genres.forEach(genre => {
      genre.createdAt = new Date();
      genre.updatedAt = new Date();
    })
    return queryInterface.bulkInsert('Genres', genres, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
