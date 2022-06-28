const penawaranService = require("../../../services/penawaranService");
const notificationService = require("../../../services/notificationService");

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
        id_seller: req.body.id_seller,
        id_buyer: req.body.id_buyer,
        offering_price: req.body.offering_price,
      })
      .then((post) => {
        res.status(200).json({
          status: "OK",
          data: post,
        });
        let title = "Penawaran produk";
        let userId = post.id_seller
        let productId = post.id_product
        let message = "Ditawar Rp " + post.offering_price
        let notif = notificationService
        .create(title, userId, productId, message)
        title = "Berhasil ditawar";
        userId = post.id_buyer
        productId = post.id_product
        message = "Ditawar Rp " + post.offering_price
        notif = notificationService
        .create(title, userId, productId, message)
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
