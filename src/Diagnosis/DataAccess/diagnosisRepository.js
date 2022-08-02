const { Symptoms } = require("../Models/symptoms");
const ErrorMessages = require("../../Utils/errorMessages");
const { AppError, StatusCode } = require("../../utils/app-error");

module.exports = class DiagnosisRepository {
  constructor() {}

  async save(data) {
    try {
      return await Symptoms.create(data);
    } catch (err) {
      throw new AppError(StatusCode.SERVER, ErrorMessages.InternalServerError);
    }
  }

  async getAllSymptoms() {
    try {
      return await Symptoms.findAll();
    } catch (err) {
      throw new AppError(StatusCode.SERVER, ErrorMessages.InternalServerError);
    }
  }
};
