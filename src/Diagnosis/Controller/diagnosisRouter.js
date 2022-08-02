var express = require("express");
const DiagnosisController = require("./diagnosisController");

const diagnosisRouter = express.Router();
const diagnosisController = new DiagnosisController();

diagnosisRouter.get("/symptoms/", function (req, res) {
  diagnosisController.obtainSymptoms(req, res);
});

module.exports = diagnosisRouter;
