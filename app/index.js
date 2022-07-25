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

app.use(router);
router.use(express.urlencoded({ extended: true }));

module.exports = app;
