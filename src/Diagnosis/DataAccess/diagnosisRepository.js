const { Symptoms } = require("../Models/symptoms");
const ErrorMessages = require("../../Utils/errorMessages");
const { AppError, StatusCode } = require("../../utils/app-error");
const { Consultations } = require("../Models/consultations");

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

  async getSymptom(id) {
    try {
      return await Symptoms.findOne({ where: { ID: id } });
    } catch (err) {
      throw new AppError(StatusCode.SERVER, ErrorMessages.InternalServerError);
    }
  }

  async saveConsultation(data) {
    try {
      return await Consultations.create(data);
    } catch (err) {
      throw new AppError(StatusCode.SERVER, ErrorMessages.InternalServerError);
    }
  }

  async getConsultations(userEmail) {
    try {
      return await Consultations.findAll({ where: { email: userEmail } });
    } catch (err) {
      throw new AppError(StatusCode.SERVER, ErrorMessages.InternalServerError);
    }
  }

  async getConsultation(userEmail, consultationId) {
    try {
      return await Consultations.findOne({
        where: { email: userEmail, id: consultationId },
      });
    } catch (err) {
      throw new AppError(StatusCode.SERVER, ErrorMessages.InternalServerError);
    }
  }

  async updateConsultation(userEmail, consultationId, confirmedDiagnosis) {
    try {
      return await Consultations.update(
        {
          confirmedDiagnosis: confirmedDiagnosis,
        },
        {
          where: { email: userEmail, id: consultationId },
        }
      );
    } catch (err) {
      throw new AppError(StatusCode.SERVER, ErrorMessages.InternalServerError);
    }
  }
};
