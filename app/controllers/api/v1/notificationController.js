const path = require("path");
var nodemailer = require("nodemailer");
var hbs = require("nodemailer-express-handlebars");
const notificationService = require("../../../services/notificationService");
const jwt = require("jsonwebtoken");

function rupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "Rahasia");
  } catch (error) {
    return null;
  }
}
module.exports = {
  async listNotif(req, res) {
    const notif = await notificationService
      .findAll(req.params.id)
      .then(({ notif }) => {
        res.status(200).json({ notif });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async notifApp(app, user, product, offer, messages) {
    const title = app;
    const userId = user;
    const productId = product;
    const offeringId = offer;
    const message = messages;
    const notif = await notificationService.create(
      title,
      userId,
      productId,
      offeringId,
      message
    );
  },

  async sendMail(address, subject, template, name, product, price) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "notifications.secondhand@gmail.com",
        pass: "innerptyxiwkvuns",
      },
    });

    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("./app/mail"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./app/mail"),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarOptions));

    var mailOptions = {
      from: "SecondHand",
      to: address,
      subject: subject,
      template: template,
      context: {
        name: name,
        product: product,
        price: rupiah(price),
      },
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
  async findMyNotif(req, res) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = verifyToken(token);

      await notificationService
        .findByIdUser(tokenPayload.id)
        .then((notifications) => {
          res.status(200).json(notifications);
        })
        .catch((err) => {
          res.status(422).json({
            status: "FAIL",
            message: err.message,
          });
        });
    } catch (error) {
      res.status(422).json({
        status: "FAIL",
        message: error.message,
      });
    }
  },

  async sendMailForgotPassword(address, subject, template, url, email) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "notifications.secondhand@gmail.com",
        pass: "innerptyxiwkvuns",
      },
    });

    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("./app/mail"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./app/mail"),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarOptions));

    var mailOptions = {
      from: "SecondHand",
      to: address,
      subject: subject,
      template: template,
      // html: `<p>Berikut link yang diberikan untuk reset password Anda</p>`,
      context: {
        email: email,
        url: url,
      },
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
  async updateNotification(req, res) {
    try {
      let updateArgs = {
        status: req.body.status,
      };
      await notificationService
      .update(req.params.id, updateArgs)
      .then((notifications) => {
        res.status(200).json({
          status: "UPDATE_TRANSACTION_SUCCESS",
          notifications,
        });
      });
    } catch (error) {
      res.status(422).json({
        status: "FAIL",
        message: error.message,
      });
    }
  },
};
