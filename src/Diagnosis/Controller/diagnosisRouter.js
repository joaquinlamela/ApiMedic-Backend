var express = require("express");
const userAuthMiddleware = require("../../Utils/userAuth");
const DiagnosisController = require("./diagnosisController");

const diagnosisRouter = express.Router();
const diagnosisController = new DiagnosisController();

diagnosisRouter.get("/symptoms/", userAuthMiddleware, function (req, res) {
  diagnosisController.obtainSymptoms(req, res);
});

diagnosisRouter.get("/diagnosis/", userAuthMiddleware, function (req, res) {
  diagnosisController.obtainDiagnosis(req, res);
});

module.exports = diagnosisRouter;
