const bcrypt = require("bcryptjs");
const { resolveMx } = require("dns/promises");
const jwt = require("jsonwebtoken");
const { User } = require("../../../models");
const SALT = 10;
const userService = require("../../../services/authService");

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encryptPassword) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(encryptPassword);
    });
  });
}

function checkPassword(encryptPassword, password) {}
