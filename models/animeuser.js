'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnimeUser extends Model {
    static associate(models) {
      AnimeUser.belongsTo(models.User, { foreignKey: "userId" })
      AnimeUser.belongsTo(models.Anime, { foreignKey: "animeId"})
    }

  };
  AnimeUser.init({
    userId: DataTypes.INTEGER,
    animeId: DataTypes.INTEGER,
    user_rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AnimeUser',
  });
  return AnimeUser;
};