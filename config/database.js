/**
 * @file Manages database connection configuration.
 * @author Fikri Rahmat Nurhidayat
 */
const dotenv = require("dotenv");
require("dotenv").config();
/** Destruct environment variable to get database configuration */
const {
<<<<<<< HEAD
  DB_USERNAME = "postgres",
  DB_PASSWORD = "V3471g",
=======
  DB_USER = "",
  DB_PASSWORD = "",
>>>>>>> b6ff8eb0d6784f6bef2407267e2e602f8e8b0299
  DB_HOST = "127.0.0.1",
  DB_NAME = "SecondHand_db",
  DB_PORT = "5432",
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
