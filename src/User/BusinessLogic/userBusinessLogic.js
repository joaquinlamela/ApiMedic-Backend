const UserRepository = require("../DataAccess/userRepository");
const ErrorMessages = require("../../Utils/errorMessages");

const CryptoService = require("../../Utils/criptographyService");

const Joi = require("joi");
const { AppError, StatusCode } = require("../../utils/app-error");
const INTERNAL_FORMAT_DATE = process.env.INTERNAL_FORMAT_DATE || "YYYY-MM-DD";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.PRIVATE_KEY;
const JWT_EXP_TIME = process.env.JWT_EXP_TIME;
const JWT_ALGORITHM = process.env.JWT_ALGORITHM;

const SIGN_OPTIONS = {
  expiresIn: JWT_EXP_TIME,
  algorithm: JWT_ALGORITHM,
};

const schemaRegister = Joi.object({
  name: Joi.string().required(),
  gender: Joi.string().required(),
  dateOfBirth: Joi.date(),
  email: Joi.string().email(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const schemaLogin = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

module.exports = class UserBusinessLogic {
  constructor() {
    this.userRepository = new UserRepository();
    this.cryptoService = new CryptoService();
  }

  async register(user) {
    const { email } = user;
    try {
      await schemaRegister.validateAsync(user);
    } catch (err) {
      throw new AppError(StatusCode.BAD_REQUEST, ErrorMessages.WrongFormat);
    }
    let userToRegister = await this.getUserByEmail(email);

    if (userToRegister) {
      throw new AppError(
        StatusCode.BAD_REQUEST,
        ErrorMessages.UserAlreadyExists
      );
    } else {
      user.password = await this.cryptoService.encryptOneWay(user.password);
      userToRegister = await this.userRepository.register(user);
    }
    console.info(
      `User created [user_email:${userToRegister && userToRegister.email}]`
    );
    return userToRegister;
  }

  async getUserByEmail(email) {
    return await this.userRepository.getByEmail(email);
  }

  async verifyPassword(reqPassword, userPassword) {
    const correctPwd = await bcrypt.compare(reqPassword, userPassword);
    if (!correctPwd)
      throw new AppError(
        StatusCode.BAD_REQUEST,
        ErrorMessages.InvalidCredentials
      );
  }

  async login(user) {
    const { email, password } = user;
    try {
      await schemaLogin.validateAsync(user);
    } catch (err) {
      throw new AppError(StatusCode.BAD_REQUEST, ErrorMessages.WrongFormat);
    }

    let userFromDb = await this.getUserByEmail(email);
    if (!userFromDb)
      throw new AppError(StatusCode.NOT_FOUND, ErrorMessages.UserNotFound);

    await this.verifyPassword(password, userFromDb.password);

    console.info(`Login ok [user_email:${email}]`);
    return jwt.sign(
      {
        email: userFromDb.email,
      },
      SECRET_KEY,
      SIGN_OPTIONS
    );
  }
};
