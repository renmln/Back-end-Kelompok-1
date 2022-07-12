const transaksiService = require("../../../services/transaksiService");

module.exports = {
  async createTransaksi(req, res) {
    transaksiService
      .create({
        id_seller: req.body.id_seller,
        id_offering: req.body.id_offering,
        id_buyer: req.body.id_buyer,
        status: req.body.status,
      })
      .then((post) => {
        res.status(200).json({
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

  async listTransaksi(req, res) {
    const transactions = transaksiService
      .findAll()
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

  async findAllProduct(req, res) {
    const transactions = await transaksiService
      .findAll()
      .then((transactions) => {
        res.status(200).json(transactions);
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async destroyTransaksi(req, res) {
    transaksiService
      .delete(req.params.id)
      .then((transaksi) => {
        res.status(200).json({
          status: "OK",
          message: "Transaction deleted",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async findOneTransaction(req, res) {
    try {
      const transactions = await transaksiService
        .find(req.params.id)
        .then((transactions) => {
          res.status(200).json(transactions);
        })
        .catch((err) => {
          res.status(422).json({
            status: "FAIL",
            message: err.message,
          });
        });
    } catch (err) {
      res.status(422).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },
};
