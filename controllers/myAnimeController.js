const { User, Anime, AnimeUser, Sequelize } = require('../models');
const { hashing, compare } = require("../helper/hash");
const { gt } = Sequelize.Op;
const MyFunction = require("../helper/my-function");

class MyAnimeController {

    static getAnimes(req, res) {
        let promise1 = Anime.findAll({ include: {
                model: AnimeUser,
                where: {
                    user_rating:{
                        [gt]: 0
                    }
                }
            } })
        let promise2 = Anime.findAll({
            include: { model: AnimeUser, where: { userId: req.session.userId } }
        })
        let promise3 = User.findByPk(req.session.userId)
        Promise.all([promise1, promise2, promise3])
            .then(([animes, myAnimes, user]) => {
                let result = myAnimes.map(myAnime => {
                    let { id, title, image, synopsis } = myAnime;
                    let user_rating = myAnime.AnimeUsers[0].user_rating;
                    let rating, totalRater;
                    animes.forEach((anime, i) => {
                        if(myAnime.id === anime.id) {
                            rating = anime.AnimeUsers.reduce((sum, animeUser) => { return sum + animeUser.user_rating }, 0)/anime.AnimeUsers.length;
                            totalRater = anime.AnimeUsers.length;
                        }
                    })
                    return { id, title, image, synopsis, user_rating, rating, totalRater }
                })
                res.render("animes/my-anime-list", { animes: result, isLogin: !!req.session.userId, user })
            })
            .catch(err => res.send(err))
    }

    static getAddRating(req, res) {
        let animeId = req.params.animeId
        Anime.findByPk(animeId)
            .then(anime => res.render("animes/add-rating", { anime }))
            .catch(err => res.send(err));
    }

    static addRating(req, res) {
        let animeId = req.params.animeId;
        let userId = req.session.userId;
        let { user_rating } = req.body;
        AnimeUser.update({ user_rating }, { where: { userId, animeId } })
            .then(() => res.redirect("/my-anime-list"))
            .catch(err => res.send(err));
    }
    
    static getEditRating(req, res) {
        let animeId = req.params.animeId;
        let userId = req.session.userId;
        Anime.findByPk(animeId, { include: { model: AnimeUser, where: { userId } }})
            .then(anime => {
                let result = {}
                result.id = anime.id;
                result.title = anime.title;
                result.user_rating = anime.AnimeUsers[0].user_rating;
                res.render("animes/edit-rating", { anime: result })
            })
            .catch(err => res.send(err))
    }

    static editRating(req, res) {
        let animeId = req.params.animeId;
        let userId = req.session.userId;
        let { user_rating } = req.body;
        AnimeUser.update({ user_rating }, { where: { animeId, userId } })
            .then(() => res.redirect("/my-anime-list"))
            .catch(err => res.send(err));
    }

    static getDeleteRating(req, res) {
        let animeId = req.params.animeId;
        let userId = req.session.userId;
        AnimeUser.update({ user_rating: null }, { where: { userId, animeId } })
            .then(() => res.redirect("/my-anime-list"))
            .catch(err => res.send(err))
    }

    static getDeleteFavorite(req, res) {
        let animeId = req.params.animeId;
        let userId = req.session.userId;
        AnimeUser.destroy({ where: { userId, animeId } })
            .then(() => res.redirect("/my-anime-list"))
            .catch(err => res.send(err));
    }
}

module.exports = MyAnimeController;