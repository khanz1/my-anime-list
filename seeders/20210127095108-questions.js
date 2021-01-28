'use strict';
const questions = require('../database/questions.json')

module.exports = {
  up: (queryInterface, Sequelize) => {
    questions.forEach(question => {
      question.createdAt = new Date();
      question.updatedAt = new Date();
    })
    return queryInterface.bulkInsert('Questions', questions, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
