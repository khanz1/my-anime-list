const express = require('express');
const userRouter = express.Router();
const mid = require("../helper/middleware");
const UserController = require("../controllers/userController")


userRouter.get("/:userId", mid, UserController.userDetail);
userRouter.get("/:userId/verified", mid, UserController.verified);
userRouter.get("/:userId/send-verification-email", mid, UserController.sendVerificationEmail)

module.exports = userRouter;