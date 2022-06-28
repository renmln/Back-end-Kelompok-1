const penawaranService = require("../../../services/penawaranService");

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
        const title = "Penawaran produk";
        const userId = post.id // ???
        const productId = post.id_product
        const message = "Ditawar Rp " + post.offering_price
        const notif = notificationService
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
