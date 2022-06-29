const penawaranService = require("../../../services/penawaranService");
const notificationService = require("../../../services/notificationService");

async function notifDibeli(x, y, z) {
  const title = "Penawaran produk";
  const userId = x
  const productId = y
  const message = "Ditawar Rp " + z
  const notif = await notificationService
  .create(title, userId, productId, message)
}

async function notifBeli(x, y, z) {
  const title = "Berhasil ditawar";
  const userId = x
  const productId = y
  const message = "Ditawar Rp " + z
  const notif = await notificationService
  .create(title, userId, productId, message)
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
        let notif = notifDibeli(post.id_seller,post.id_product,post.offering_price)
        notif = notifBeli(post.id_buyer,post.id_product,post.offering_price)
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
