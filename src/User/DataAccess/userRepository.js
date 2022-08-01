const { User } = require("../Models/user");
const ErrorMessages = require("../../Utils/errorMessages");
const { AppError, StatusCode } = require("../../utils/app-error");

module.exports = class UserRepository {
  constructor() {}

  async register(data) {
    try {
      return await User.create(data);
    } catch (err) {
      throw new AppError(StatusCode.SERVER, ErrorMessages.InternalServerError);
    }
  }

  async getByEmail(email) {
    try {
      return await User.findOne({ where: { email: email } });
    } catch (err) {
      throw new AppError(StatusCode.SERVER, ErrorMessages.InternalServerError);
    }
  }
};
