const express = require("express");
const app = express();
const router = require("../config/routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// Set format request
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const { Pool } = require("pg");

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// client.connect();

// client.query(
//   "SELECT table_schema,table_name FROM information_schema.tables;",
//   (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//       console.log(JSON.stringify(row));
//     }
//     client.end();
//   }
// );

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:a34ac7ec23d2440991afd9d1896dfd047a18e9814b33af2a8a3f0fa9610d7957@localhost:5432/d537ovteft4pgp",
  ssl: process.env.DATABASE_URL ? true : false,
});

pool.connect();

app.use(router);
router.use(express.urlencoded({ extended: true }));

module.exports = app;
