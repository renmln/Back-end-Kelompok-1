const bcrypt = require("bcryptjs");
const { resolveMx } = require("dns/promises");
const jwt = require("jsonwebtoken");
const { restart } = require("nodemon");
const { User } = require("../../../models");
const SALT = 10;
const userService = require("../../../services/userService");
const mail = require("./notificationController");

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encryptedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(encryptedPassword);
    });
  });
}

function checkPassword(encryptedPassword, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
      if (!!err) {
        reject(err);
        return;
      }
      resolve(isPasswordCorrect);
    });
  });
}

function createToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET || "Rahasia", {
    expiresIn: 60 * 60,
  });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "Rahasia");
  } catch (error) {
    return null;
  }
}

module.exports = {
  async register(req, res) {
    const name = req.body.name;
    const email = req.body.email;

    // Check if user already exists
    const existedUser = await userService.findId(email);
    if (existedUser) {
      return res.status(400).send({
        status: "FAIL",
        message: "Email telah digunakan",
      });
    }

    const password = await encryptPassword(req.body.password);
    if (req.body.password === "") {
      res.status(422).json({
        status: "FAIL",
        message: "Password is required",
      });
      return;
    }

    userService
      .create({ name, email, password })
      .then((user) => {
        res.status(201).json({
          status: "REGISTER_SUCCESS",
          data: user,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async login(req, res) {
    const email = req.body.email.toLowerCase(); // Biar case insensitive
    const password = req.body.password;

    let user = await User.findOne({
      where: { email },
    });
    if (!user) {
      res.status(404).json({ message: "Email tidak ditemukan" });
      return;
    }

    const isPasswordCorrect = await checkPassword(user.password, password);
    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Password salah!" });
      return;
    }

    user = JSON.parse(JSON.stringify(user));
    delete user.password;

    const token = createToken(user);

    res.status(200).json({
      status: "LOGIN_SUCCESS",
      token,
      user,
    });
  },

  async whoAmI(req, res) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = verifyToken(token);

      const user = JSON.parse(JSON.stringify(await userService.findId(tokenPayload.email)));
      delete user.password;

      res.status(200).json({ user });
    } catch (error) {
      res.status(401).json({
        status: "FAILED",
        message: "Token expired",
      });
    }
  },

  // halaman kirim email
  async forgotPassword(req, res) {
    const email = req.body.email.toLowerCase();

    let user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ message: "Email tidak ditemukan" });
      return;
    }

    const token = createToken(user);

    await User.updateOne({ resetPasswordLink: token });

    const title = "Reset Passoword Link";

    // mail.sendMailForgotPassword(email, title, token, fullname, resetPasswordLink);
    mail.sendMailForgotPassword(email, title, token);

    return res.status(200).json({
      message: "berhasil",
    });
  },

  // halaman reset password
  async verifyForgotPasswordLink(req, res) {
    const token = req.params.token;

    var tokendb = await User.findToken(token).then((tokendb) => {
      res.status(200).json({ data: tokendb.id });
      return;
    });
  },

  // put resetpassword/:id
  async resetpassword(req, res) {
    const id = req.params.id;

    //
  },
};
