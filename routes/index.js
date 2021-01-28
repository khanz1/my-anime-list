const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController");

const myAnimeListRouter = require("./my-anime-list");
const animeListRouter = require("./anime-list");
const accountRouter = require("./account");
const userRouter = require("./user");


router.get("/", UserController.home)
router.use("/user", userRouter);
router.use("/", accountRouter);
router.use("/anime-list", animeListRouter);
router.use("/my-anime-list", myAnimeListRouter);

module.exports = router;