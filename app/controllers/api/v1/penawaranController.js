const penawaranService = require("../../../services/penawaranService");
const { User } = require("../../../models/")

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

  async redirectWhatsapp(req, res) {
    // fetch id_buyer from Offering
    penawaranService.findBuyer(req.params.id_buyer).then((data) => {
      const user = await user.findOne({ where: { id: data }})
      return `https://api.whatsapp.com/send/?phone=${user.no_hp}&text&app_absent=0`
    });
  },
};

