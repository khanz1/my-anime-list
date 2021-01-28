const express = require('express');
const myAnimeListRouter = express.Router();
const mid = require("../helper/middleware");
const MyAnimeController = require("../controllers/myAnimeController")


myAnimeListRouter.get("/", mid, MyAnimeController.getAnimes)
myAnimeListRouter.get("/:animeId/add-rating", mid, MyAnimeController.getAddRating)
myAnimeListRouter.post("/:animeId/add-rating", mid, MyAnimeController.addRating)
myAnimeListRouter.get("/:animeId/edit-rating", mid, MyAnimeController.getEditRating)
myAnimeListRouter.post("/:animeId/edit-rating", mid, MyAnimeController.editRating)
myAnimeListRouter.get("/:animeId/delete-rating", mid, MyAnimeController.getDeleteRating)
myAnimeListRouter.get("/:animeId/delete-favorite", mid, MyAnimeController.getDeleteFavorite)

module.exports = myAnimeListRouter;