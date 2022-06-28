const transaksiService = require("../../../services/transaksiService");

module.exports = {
  async listTransaksi(req, res) {
    transaksiService
      .list()
      .then(({ transactions }) => {
        res.status(201).json({ transactions });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  //   createPenawaran(req, res) {
  //     transaksiService
  //       .create({
  //         id_product: req.body.id_product,
  //         id_buyer: req.body.id_buyer,
  //         offering_price: req.body.offering_price,
  //       })
  //       .then((post) => {
  //         res.status(200).json({
  //           status: "OK",
  //           data: post,
  //         });
  //       })
  //       .catch((err) => {
  //         res.status(422).json({
  //           status: "FAIL",
  //           message: err.message,
  //         });
  //       });
  //   },
};