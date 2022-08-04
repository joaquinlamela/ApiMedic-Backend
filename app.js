const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const result = require("dotenv").config();

if (result.error) {
  console.error(`Env error [${result.error}]`);
  throw result.error;
}

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use("/users", require("./src/User/Controller/userRouter"));
app.use("/diagnosis", require("./src/Diagnosis/Controller/diagnosisRouter"));

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}!`);
});
