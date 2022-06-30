const path = require('path')
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const notificationService = require("../../../services/notificationService");

function rupiah(number) {
    return new Intl.NumberFormat("id-ID", {style: "currency",currency: "IDR"}).format(number);
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

    async notifApp(title, user, product, message) {
        const title = title
        const userId = user
        const productId = product
        const message = message
        const notif = await notificationService
        .create(title, userId, productId, message)
    },

    async sendMail(address, subject, template, name, product, price){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'seconhands.app@gmail.com',
              pass: 'ustdrziozxlatwox'
            }
          });
          
          const handlebarOptions = {
            viewEngine: {
              extName: ".handlebars",
              partialsDir: path.resolve('./app/controllers/api/v1/mail'),
              defaultLayout: false,
            },
            viewPath: path.resolve('./app/controllers/api/v1/mail'),
            extName: ".handlebars",
          }
          
          transporter.use('compile', hbs(handlebarOptions));
          
          var mailOptions = {
            from: 'SecondHand',
            to: address,
            subject: subject,
            template: template,
            context: {
              name: name,
              product: product,
              price: rupiah(price)
            }
          
          };
          
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}