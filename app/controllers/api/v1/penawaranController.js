const penawaranService = require("../../../services/penawaranService");
const productService = require("../../../services/productService");
const userService = require("../../../repositories/userRepository");
const mail = require("./notificationController");

function rupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

module.exports = {
  async listPenawaran(req, res) {
    penawaranService
      .list()
      .then(({ offerings }) => {
        res.status(201).json({ offerings });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  createPenawaran(req, res) {
    penawaranService
      .create({
        id_product: req.body.id_product,
        id_buyer: req.body.id_buyer,
        offering_price: req.body.offering_price,
      })
      .then((post) => {
        res.status(200).json({
          status: "OK",
          data: post,
        });
        const price = post.offering_price;
        const buyer = userService.findUserEmail(post.id_buyer).then((buyer) => {
          const bname = buyer.name;
          const bemail = buyer.email;
          const product = productService
            .findProduct(post.id_product)
            .then((product) => {
              const productName = product.product_name;
              const title = "Penawaran produk";
              const message = "Ditawar " + rupiah(price);
              const seller = userService
                .findUserEmail(product.id_seller)
                .then((seller) => {
                  const sname = seller.name;
                  const semail = seller.email;
                  const btemp = "offeringproduct";
                  const stemp = "getoffering";
                  let notif = mail.notifApp(
                    title,
                    buyer.id,
                    product.id,
                    message
                  );
                  notif = mail.notifApp(title, seller.id, product.id, message);
                  let email = mail.sendMail(
                    bemail,
                    title,
                    btemp,
                    bname,
                    productName,
                    price
                  );
                  email = mail.sendMail(
                    semail,
                    title,
                    stemp,
                    sname,
                    productName,
                    price
                  );
                });
            });
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async destroyPenawaran(req, res) {
    penawaranService
      .delete(req.params.id)
      .then((penawaran) => {
        res.status(200).json({
          status: "OK",
          message: "Penawaran deleted",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
};
