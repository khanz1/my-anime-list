'use strict';
const {
    Model
} = require('sequelize');
const { hashing, compare } = require("../helper/hash.js");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsToMany(models.Anime, { through: models.AnimeUser, foreignKey: "userId" })
            User.hasMany(models.AnimeUser, { foreignKey: "userId" })
            User.belongsTo(models.Question, { foreignKey: "questionId" })
            User.belongsTo(models.Role, { foreignKey: "roleId" })
        }
    };
    User.init({
        username: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "username tidak boleh kosong"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "password tidak boleh kosong"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "email tidak boleh kosong"
                }
            }
        },
        birth_date: {
            type: DataTypes.DATE,
            validate: {
                notBorn(value) {
                    if(value.toString() === "Invalid Date") {
                        throw new Error("birth date tidak boleh kosong")
                    } else if(value > new Date()) {
                        throw new Error("yang belum lahir ga boleh daftar")
                    }
                }
            }
        },
        questionId: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: "question tidak boleh kosong"
                }
            }
        },
        hint: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "hint tidak boleh kosong"
                }
            }
        },
        roleId: DataTypes.INTEGER,
        is_verified: DataTypes.BOOLEAN
    }, {
        hooks: {
            beforeCreate: (user, option) => {
                user.password = hashing(user.password)
                user.is_verified = false;
            }
        },
        sequelize,
        modelName: 'User',
    });
    return User;
};