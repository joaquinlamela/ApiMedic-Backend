var express = require("express");
const UserController = require("./userController");

const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/", function (req, res) {
  userController.register(req, res);
});

module.exports = userRouter;
