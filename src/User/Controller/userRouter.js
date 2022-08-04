var express = require("express");
const UserController = require("./userController");

const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/", function (req, res) {
  userController.register(req, res);
});

userRouter.post("/login/", function (req, res) {
  userController.login(req, res);
});

module.exports = userRouter;
