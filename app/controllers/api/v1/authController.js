const bcrypt = require("bcryptjs");
const { resolveMx } = require("dns/promises");
const jwt = require("jsonwebtoken");
const { User } = require("../../../models");
const SALT = 10;
const userService = require("../../../services/userService");

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
  return jwt.sign(data, process.env.JWT_SECRET || "Rahasia");
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET || "Rahasia");
}

module.exports = {
  async register(req, res) {
    const email = req.body.email;
    const password = await encryptPassword(req.body.password);
    if (req.body.password === "") {
      res.status(422).json({
        status: "FAIL",
        message: "Password is required",
      });
      return;
    }
    userService
      .create({ email, password })
      .then((post) => {
        // res.redirect("/");
        res.status(201).json({
          status: "OK",
          data: post,
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

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ message: "Email tidak ditemukan" });
      return;
    }

    const isPasswordCorrect = await checkPassword(user.password, password);

    //create token
    const token = createToken({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Password salah!" });
      return;
    }
    res.cookie("jwt", token, { httpOnly: true });
    if (token) {
      jwt.verify(
        token,
        process.env.JWT_SIGNATURE_KEY || "Rahasia",
        (err, decodedToken) => {
          if (err) {
            console.log(err, message);
            // res.redirect("/");
            res.status(422).json({
              status: "FAIL",
              message: err.message,
            });
          } else {
            console.log(decodedToken);
            const role = decodedToken.role;
            if (role == "seller") {
              // res.redirect("/");
              res.status(201).json({
                id: user.id,
                email: user.email,
                token,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              });
            } else {
              // res.redirect("/");
              res.status(201).json({
                id: user.id,
                email: user.email,
                token,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              });
            }
          }
        }
      );
    } else {
      res.status(422).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async logout(req, res) {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
  },
};
