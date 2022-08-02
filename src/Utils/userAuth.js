const jwt = require("jsonwebtoken");
const message = require("./errorMessages");
const PUBLIC_KEY = process.env.PUBLIC_KEY;

module.exports = async function (req, res, next) {
  const authHeader = req.header("Authorization");

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: message.NotTokenProviden });
  }

  jwt.verify(token, PUBLIC_KEY, (err, data) => {
    if (err) return res.status(403).json({ message: message.InvalidToken });
    req.userEmail = data.email;

    next();
  });
};
