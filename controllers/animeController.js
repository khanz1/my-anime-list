const { Anime, AnimeUser, User, Sequelize, Role } = require('../models')
const { gt } = Sequelize.Op
const MyFunction = require("../helper/my-function");

class AnimeController {

    static getAnimes(req, res) {
        let userId = req.session.userId;
        let isLogin = !!req.session.userId;
        if(isLogin) {
            let promise1 = Anime.findAll({
                include: {
                    model: AnimeUser,
                    where: {
                        user_rating:{
                            [gt]: 0
                        }
                    }
                }
            })
            let promise2 = AnimeUser.findAll({ where: { userId } })
            let promise3 = User.findByPk(req.session.userId);
            Promise.all([promise1, promise2, promise3, promise4])
                .then(([animes, myAnimes, user]) => {
                    let result = animes.map(anime => {
                        let { id, title, image, synopsis, restriction } = anime;
                        let rating = anime.AnimeUsers.reduce((sum, animeUser) => { return sum + animeUser.user_rating }, 0)/anime.AnimeUsers.length;
                        let totalRater = anime.AnimeUsers.length;
                        let animeId;
                        myAnimes.forEach(myAnime => {
                            if(id === myAnime.animeId) { animeId = myAnime.animeId }
                        })
                        let age = MyFunction.getAge(user.birth_date)
                        return { id, title, image, synopsis, rating, totalRater, animeId, restriction, age }
                    });
                    res.render("animes/anime-list", { animes: result, isLogin:true, user })
                })
                .catch(err => res.render("error-page", { errors: err.message }))
        } else {
            Anime.findAll({
                include: {
                    model: AnimeUser,
                    where: {
                        user_rating:{
                            [gt]: 0
                        }
                    }
                }
            })
                .then(result => res.render("animes/anime-list", { animes: result, isLogin: false, user: null }))
                .catch(err => res.render("error-page", { errors: err.message }));

        }
    }

    static getAddFavorite(req, res) {
        let animeId = Number(req.params.animeId);
        let userId = req.session.userId;
        AnimeUser.create({ userId, animeId })
            .then(() => res.redirect("/anime-list"))
            .catch(err => res.render("error-page", { errors: err.message }))
    }
}

module.exports = AnimeController;
 