const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const algorithm = process.env.CRIPTOGRAPHY_ALGORITHM;
const IV = process.env.IV;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

module.exports = class CryptoService {
  constructor() {}

  encrypt(text) {
    let cipher = crypto.createCipheriv(
      algorithm,
      Buffer.from(ENCRYPTION_KEY),
      Buffer.from(IV)
    );
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return IV.toString("hex") + ":" + encrypted.toString("hex");
  }

  decrypt(text) {
    let textParts = text.split(":");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    let decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(ENCRYPTION_KEY),
      Buffer.from(IV)
    );
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }

  encryptOneWay = async (text) => {
    const salt = await bcrypt.genSalt(3);
    return await bcrypt.hash(text, salt);
  };

  encryptWithsha256 = (text) => {
    return crypto.createHash("sha256").update(text).digest("base64");
  };

  getToken() {
    return uuidv4();
  }
};
