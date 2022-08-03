const { Sequelize } = require("sequelize");
const database = process.env.MYSQL_DATABASE;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: "mysql",
});

const Consultations = sequelize.define(
  "Consultations",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    diagnosis: {
      type: Sequelize.JSON,
    },
    symptoms: {
      type: Sequelize.JSON,
    },
    email: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

Consultations.sync({ alter: true });

sequelize.sync();

module.exports = {
  Consultations,
};
