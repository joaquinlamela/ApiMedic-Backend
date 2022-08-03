const { AppError, StatusCode } = require("../../utils/app-error");
const ErrorMessages = require("../../Utils/errorMessages");
const axios = require("axios");
const CryptoJS = require("crypto-js");
const DiagnosisRepository = require("../DataAccess/diagnosisRepository");
const UserRepository = require("../../User/DataAccess/userRepository");

module.exports = class DiagnosisBusinessLogic {
  constructor() {
    this.diagnosisRepository = new DiagnosisRepository();
    this.userRepository = new UserRepository();
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

  async obtainDiagnosis(request) {
    const token = await this.authAPI();
    const uri = `${process.env.URI_HEALTH_API}/diagnosis`;

    const user = await this.getUser(request.userEmail);
    const userYearOfBirth = new Date(user.dataValues.dateOfBirth).getFullYear();
    const symptoms = request.query.symptoms;
    const symptomsId = JSON.parse(symptoms);

    const symptomsNames = [];

    for (const symptomId of symptomsId) {
      const data = await this.getSymptom(symptomId);
      symptomsNames.push(data.dataValues.name);
    }

    const config = {
      params: {
        token: token,
        format: "json",
        language: "en-gb",
        symptoms: symptoms,
        gender: user.dataValues.gender,
        year_of_birth: userYearOfBirth,
      },
    };

    try {
      let response = await axios.get(uri, config);
      const diagnosis = response.data;
      const consultation = {
        date: Date.now(),
        diagnosis: diagnosis,
        symptoms: symptomsNames,
        email: request.userEmail,
        confirmedDiagnosis: "",
      };

      await this.diagnosisRepository.saveConsultation(consultation);
      return diagnosis;
    } catch {
      throw new AppError(StatusCode.SERVER, ErrorMessages.InternalServerError);
    }
  }

  async getUser(email) {
    return await this.userRepository.getByEmail(email);
  }

  async getSymptom(id) {
    return await this.diagnosisRepository.getSymptom(id);
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

  async obtainConsultations(request) {
    const userEmail = request.userEmail;
    return await this.getConsultations(userEmail);
  }

  async getConsultations(userEmail) {
    return await this.diagnosisRepository.getConsultations(userEmail);
  }
};
