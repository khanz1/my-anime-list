'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      Question.hasMany(models.User, { foreignKey: "questionId" })
    }
  };
  Question.init({
    question: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};