const express = require('express');
const userRouter = express.Router();
const mid = require("../helper/middleware");
const UserController = require("../controllers/userController")


userRouter.get("/:userId", mid, UserController.userDetail);
userRouter.get("/:userId/verified", UserController.verified);

module.exports = userRouter;