const UserRepository = require("../DataAccess/userRepository");
const ErrorMessages = require("../../Utils/errorMessages");

const CryptoService = require("../../Utils/criptographyService");

const Joi = require("joi");
const { AppError, StatusCode } = require("../../utils/app-error");
const INTERNAL_FORMAT_DATE = process.env.INTERNAL_FORMAT_DATE || "YYYY-MM-DD";

/* 

.format(`${INTERNAL_FORMAT_DATE}`)
    .max(moment().format(`${INTERNAL_FORMAT_DATE}`))
    .required(),

*/

const schema = Joi.object({
  name: Joi.string().required(),
  gender: Joi.string().required(),
  dateOfBirth: Joi.date(),
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
      await schema.validateAsync(user);
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
};
