const express = require("express");
const app = express();
const router = require("../config/routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

// Set format request
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(router);
router.use(express.urlencoded({ extended: true }));
app.get('/documentation.json', (req, res) => res.send(swaggerDocument));
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


module.exports = app;
