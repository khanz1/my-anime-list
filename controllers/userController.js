const { User, Anime, AnimeUser, Sequelize, Role } = require('../models');
const { hashing, compare } = require("../helper/hash");
const { gt } = Sequelize.Op;
const MyFunction = require("../helper/my-function");

class UserController {

    static getResetPassword(req, res, next, errors = null) {
        res.render("users/reset-password", { errors })
    }

    static getVerifiedResetPw(req, res) {
        let id = req.params.userId;
        User.findByPk(id)
            .then(user => {
                res.render("users/verified-resetpw", { user, errors: null })
            })
            .catch(err => {
                UserController.getResetPassword(req, res, null, "username atau question atau hint masih salah")
            })
    }

    static verifiedResetPw(req, res) {
        let id = req.params.userId;
        let { password } = req.body;
        password = hashing(password)
        User.update({ password }, { where: { id } })
            .then(() => res.redirect("/login"))
            .catch(err => res.send(err));
    }

    static resetPassword(req, res) {
        let { username, questionId, hint } = req.body;
        console.log(username, questionId, hint)
        User.findOne({ where: { username } })
            .then(user => {
                if(Number(questionId) !== user.questionId || hint !== user.hint) {
                    throw new Error("question atau hint salah")
                } else {
                    res.redirect(`/reset-password/${user.id}/verified`)
                }
            })
            .catch(err => {
                UserController.getResetPassword(req, res, null, err.message)
            })
    }

    static userDetail(req, res) {
        let userId = req.session.userId;
        User.findByPk(userId, { include: Role })
            .then(user => res.render("users/edit-user", { isLogin: true, user }))
            .catch(err => res.send(err));
    }

    static verified(req, res) {
        let userId = req.params.userId;

        User.update({ is_verified: true }, { where: { id: userId } })
            .then(() => res.redirect("/login"))
            .catch(err => res.send(err))
    }

    static home(req, res) {
        let isLogin = !!req.session.userId;
        if(isLogin) {
            User.findByPk(req.session.userId)
                .then(user => res.render("home", { isLogin: !!req.session.userId, user }))
        } else {
            res.render("home", { isLogin: !!req.session.userId, user: null })
        }
    }

    static getRegister(req, res, next, errors = null) {
        res.render("users/register", { errors });
    }

    static register(req, res) {
        let newUser = req.body;
        let { birth_date, email } = newUser;
        newUser.birth_date = new Date(birth_date);
        newUser.createdAt = new Date();
        newUser.updatedAt = new Date();
        User.create(newUser)
            .then(() => User.findOne({ where: { email } }))
            .then(user => MyFunction.sendRegistrationEmail(email, user.id))
            .then(result => {
                res.redirect("/login")
            })
            .catch(err => {
                UserController.getRegister(req, res, null, err.message)
            })
    }

    static getLogin(req, res, next, errors = null) {
        res.render("users/login", { errors })
    }

    static login(req, res) {
        let { username, password } = req.body;
        MyFunction.loginValidate(username, password)
            .then(() => User.findOne({ where: { username } }))
            .then(user => {
                if(!user) { throw new Error("username salah!!") }
                let isPassword = compare(password, user.password);
                if(isPassword) {
                    req.session.userId = user.id;
                    res.redirect("/anime-list");
                } else {
                    throw new Error("password salah!!!");
                }
            })
            .catch(err => {
                UserController.getLogin(req, res, null, err.message)
            })
    }

    static getLogout(req, res) {
        if(req.session.userId) {
            req.session.destroy();
            res.redirect("/")
        } else {
            res.redirect("/login");
        }
    }

    static getAnimes(req, res) {
        let promise1 = Anime.findAll({ include: AnimeUser })
        let promise2 = Anime.findAll({
            include: { model: AnimeUser, where: { userId: req.session.userId } }
        })
        Promise.all([promise1, promise2])
            .then(([animes, myAnimes]) => {
                let result = [];
                myAnimes.forEach(myAnime => {
                    let { id, title, image, synopsis } = myAnime;
                    let user_rating = myAnime.AnimeUsers[0].user_rating;
                    result.push({ id, title, image, synopsis, user_rating })

                    animes.forEach((anime, i) => {
                        if(myAnime.id === anime.id) {
                            let rating = anime.AnimeUsers.reduce((sum, animeUser) => { return sum + animeUser.user_rating }, 0)/anime.AnimeUsers.length;
                            let totalRater = anime.AnimeUsers.length;
                            result[i].rating = rating;
                            result[i].totalRater = totalRater;
                        }
                    })
                })
                res.render("animes/my-anime-list", { animes: result })
            })
            .catch(err => res.send(err))
    }
}

module.exports = UserController