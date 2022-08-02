const { Sequelize } = require("sequelize");
const database = process.env.MYSQL_DATABASE;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: "mysql",
});

const Symptoms = sequelize.define(
  "Symptoms",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

Symptoms.sync({ alter: true });

module.exports = {
  Symptoms,
};
