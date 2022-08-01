const { Sequelize } = require("sequelize");
const database = process.env.MYSQL_DATABASE;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: "mysql",
});

const User = sequelize.define(
  "User",
  {
    email: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    dateOfBirth: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: false,
  }
);

User.sync({ alter: true });

module.exports = {
  User,
};
