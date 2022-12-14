var express = require("express");
const userAuthMiddleware = require("../../Utils/userAuth");
const DiagnosisController = require("./diagnosisController");

const diagnosisRouter = express.Router();
const diagnosisController = new DiagnosisController();

diagnosisRouter.get("/symptoms/", userAuthMiddleware, function (req, res) {
  diagnosisController.obtainSymptoms(req, res);
});

diagnosisRouter.get("/", userAuthMiddleware, function (req, res) {
  diagnosisController.obtainDiagnosis(req, res);
});

diagnosisRouter.get("/consultations/", userAuthMiddleware, function (req, res) {
  diagnosisController.obtainConsultations(req, res);
});

diagnosisRouter.get("/consultation/", userAuthMiddleware, function (req, res) {
  diagnosisController.obtainConsultation(req, res);
});

diagnosisRouter.patch("/consultation/", userAuthMiddleware, function (req, res) {
  diagnosisController.updateConsultation(req, res);
});

module.exports = diagnosisRouter;
