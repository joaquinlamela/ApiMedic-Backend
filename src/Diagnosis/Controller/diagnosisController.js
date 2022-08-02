const DiagnosisBusinessLogic = require("../BusinessLogic/diagnosisBusinessLogic");

module.exports = class DiagnosisController {
  constructor() {
    this.diagnosisBusinessLogic = new DiagnosisBusinessLogic();
  }

  async obtainSymptoms(req, res) {
    // try {
    let symptoms = await this.diagnosisBusinessLogic.obtainSymptoms();
    res.json(symptoms);
    // } catch (err) {
    //   res.status(err.statusCode).json({ message: err.message });
    // }
  }
};
