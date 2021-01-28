const express = require('express');
const animeListRouter = express.Router();
const mid = require("../helper/middleware");
const AnimeController = require("../controllers/animeController")

animeListRouter.get("/", AnimeController.getAnimes)
animeListRouter.get("/:animeId/add-favorite", mid, AnimeController.getAddFavorite)

module.exports = animeListRouter;