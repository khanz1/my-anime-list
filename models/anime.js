'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    static associate(models) {
      Anime.belongsToMany(models.User, { through: models.AnimeUser, foreignKey: "animeId" })
      Anime.hasMany(models.AnimeUser, { foreignKey: "animeId" })
      Anime.belongsTo(models.Genre, { foreignKey: "genreId" } )
    }
  };
  Anime.init({
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    synopsis: DataTypes.TEXT,
    restriction: DataTypes.STRING,
    released_year: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    type: DataTypes.STRING,
    writer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Anime',
  });
  return Anime;
};