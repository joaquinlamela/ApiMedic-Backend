const { AppError, StatusCode } = require("../../utils/app-error");
const ErrorMessages = require("../../Utils/errorMessages");
const axios = require("axios");
const CryptoJS = require("crypto-js");
const DiagnosisRepository = require("../DataAccess/diagnosisRepository");

module.exports = class DiagnosisBusinessLogic {
  constructor() {
    this.diagnosisRepository = new DiagnosisRepository();
  }

  async obtainSymptoms() {
    const token = await this.authAPI();
    const uri = `${process.env.URI_HEALTH_API}/symptoms`;

    const config = {
      params: { token: token, format: "json", language: "en-gb" },
    };

    const symptoms = await this.getAllSymptoms();

    if (symptoms.length) return symptoms;

    try {
      let response = await axios.get(uri, config);
      response.data.map((symptom) => {
        this.diagnosisRepository.save({ id: symptom.ID, name: symptom.Name });
      });
      return response.data;
    } catch {
      throw new AppError(StatusCode.SERVER, ErrorMessages.InternalServerError);
    }
  }

  async getAllSymptoms() {
    return await this.diagnosisRepository.getAllSymptoms();
  }

  async authAPI() {
    const uri = process.env.URI_AUTH_API;
    const secretKey = process.env.SECRET_KEY_AUTH_API;
    const user = process.env.USER_AUTH_API;

    const computedHash = CryptoJS.HmacMD5(uri, secretKey);

    const computedHashString = computedHash.toString(CryptoJS.enc.Base64);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}:${computedHashString}`,
      },
    };

    try {
      let response = await axios.post(uri, null, config);
      return response.data.Token;
    } catch {
      throw new AppError(StatusCode.SERVER, ErrorMessages.InternalServerError);
    }
  }
};
