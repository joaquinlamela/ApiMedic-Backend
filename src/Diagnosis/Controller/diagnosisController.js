const DiagnosisBusinessLogic = require("../BusinessLogic/diagnosisBusinessLogic");

module.exports = class DiagnosisController {
  constructor() {
    this.diagnosisBusinessLogic = new DiagnosisBusinessLogic();
  }

  async obtainSymptoms(req, res) {
    try {
      let symptoms = await this.diagnosisBusinessLogic.obtainSymptoms();
      res.json(symptoms);
    } catch (err) {
      res.status(err.statusCode).json({ message: err.message });
    }
  }

  async obtainDiagnosis(req, res) {
    try {
      let diagnosis = await this.diagnosisBusinessLogic.obtainDiagnosis(req);
      res.json(diagnosis);
    } catch (err) {
      res.status(err.statusCode).json({ message: err.message });
    }
  }

  async obtainConsultations(req, res) {
    try {
      let consultations = await this.diagnosisBusinessLogic.obtainConsultations(
        req
      );
      res.json(consultations);
    } catch (err) {
      res.status(err.statusCode).json({ message: err.message });
    }
  }
};
