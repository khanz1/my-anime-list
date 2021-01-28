'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnimeUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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