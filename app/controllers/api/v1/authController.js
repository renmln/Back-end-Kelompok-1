const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../../models");
const { Token } = require("../../../models");
const SALT = 10;
const userService = require("../../../services/userService");
const tokenService = require('../../../services/tokenService');
const axios = require("axios");
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

      const user = JSON.parse(
        JSON.stringify(await userService.findId(tokenPayload.email))
      );
      delete user.password;

      res.status(200).json({ user });
    } catch (error) {
      res.status(401).json({
        status: "FAILED",
        message: "Token expired",
      });
    }
  },

  async google(req, res) {
    const { access_token } = req.body;

    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
      );
      const { sub, email, name } = response.data;

      let user = await userService.findIdByEmail(email);
      if (!user)
        user = await User.create({
          email,
          name,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

      const user_data = JSON.parse(JSON.stringify(user));
      delete user_data.encryptedPassword;

      const token = createToken({
        id: user.id,
        name: user.name,
        email: user.email,
        registeredVia: "google",
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });

      res.status(201).json({ token, user: user_data });
    } catch (err) {
      console.log(err.message);
      res.status(401).json({ error: { name: err.name, message: err.message } });
    }
  },

  async forgotPassword(req, res) {
    const email = req.body.email.toLowerCase();

    let user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ message: "Email tidak ditemukan" });
      return;
    }

    user = JSON.parse(JSON.stringify(user));
    delete user.password;

    let token = await Token.findOne({ where: { id_user: user.id } });
    if (!token) {
      token = createToken(user);
    }

    const title = "Link berhasil dikirim";
    const userId = user.id;
    // const notif = mail.notifApp(title, userId);
    const url = `http://localhost:3000/password-reset/${token}`;
    const subject = "Link Reset Password";
    const template = "resetpassword";
    const send = mail.sendMailForgotPassword(email, subject, template, url);

    res.status(200).json({
      message: "berhasil",
      token,
      user,
    });
  },

  // halaman reset password
  async verifyForgotPasswordLink(req, res) {
    try {
      console.log(req.headers.authorization);
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = verifyToken(token);

      const user = await userService.findId(tokenPayload.email)
      .then((response) => {
        res.status(200).json({
          message: "verified",
        });
      })
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // put resetpassword/:id
  async resetPassword(req, res) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = verifyToken(token);

      const password = await encryptPassword(req.body.password);

      const user = JSON.parse(
        JSON.stringify(await userService.findId(tokenPayload.email))
      );
      user.password = password

      await userService.update(user.id, user)
      delete user.password;

      res.status(200).json({
        status: "UPDATE_SUCCESS",
        message: "User Updated",
        user,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
