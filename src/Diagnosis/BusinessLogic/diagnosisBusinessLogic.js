const { AppError, StatusCode } = require("../../utils/app-error");
const ErrorMessages = require("../../Utils/errorMessages");
const axios = require("axios");
const CryptoJS = require("crypto-js");

module.exports = class DiagnosisBusinessLogic {
  constructor() {}

  async obtainSymptoms() {
    const token = await this.authAPI();
    console.log(token);
    return token;
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
    let token = "";

    try {
      let response = await axios.post(uri, null, config);
      return response.data.Token;
    } catch {
      throw new AppError(StatusCode.SERVER, ErrorMessages.InternalServerError);
    }
  }
};
