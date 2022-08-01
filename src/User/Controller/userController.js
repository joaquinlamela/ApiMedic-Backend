const UserBusinessLogic = require("../BusinessLogic/userBusinessLogic");

module.exports = class UserController {
  constructor() {
    this.userBusinessLogic = new UserBusinessLogic();
  }

  async register(req, res) {
    try {
      let user = await this.userBusinessLogic.register(req.body);
      res.json(user);
    } catch (err) {
      res.status(err.statusCode).json({ message: err.message });
    }
  }
};
