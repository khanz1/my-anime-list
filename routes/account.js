const express = require('express');
const accountRouter = express.Router();
const mid = require("../helper/middleware");
const UserController = require("../controllers/userController")

accountRouter.get("/register", UserController.getRegister);
accountRouter.post("/register", UserController.register);
accountRouter.get("/login", UserController.getLogin);
accountRouter.post("/login", UserController.login);
accountRouter.get("/logout", mid, UserController.getLogout);
accountRouter.get("/reset-password", UserController.getResetPassword);
accountRouter.post("/reset-password", UserController.resetPassword);
accountRouter.get("/reset-password/:userId/verified", UserController.getVerifiedResetPw)
accountRouter.post("/reset-password/:userId/verified", UserController.verifiedResetPw)

module.exports = accountRouter;