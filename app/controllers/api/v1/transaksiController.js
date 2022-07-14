const transaksiService = require("../../../services/transaksiService");
const userService = require("../../../services/userService");
const productService = require("../../../services/productService");
const penawaranService = require("../../../services/penawaranService");
const mail = require("./notificationController");

function rupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

module.exports = {
  async createTransaksi(req, res) {
    transaksiService
      .create({
        id_seller: req.body.id_seller,
        id_offering: req.body.id_offering,
        id_buyer: req.body.id_buyer,
        id_product: req.body.id_product,
        status: req.body.status,
      })
      .then((post) => {
        res.status(200).json({
          status: "OK",
          data: post,
        });
        userService.findEmail(post.id_seller).then((seller) => {
          const sid = seller.id;
          const semail = seller.email;
          const sname = seller.name;
          userService.findEmail(post.id_buyer).then((buyer) => {
            const bid = buyer.id
            const bmail = buyer.email;
            const bname = buyer.name;
            productService.findProduct(post.id_product).then((product) => {
              const pid = product.id;
              const pname = product.name;
              penawaranService.findOffer(post.id_offering).then((offer) => {
                const price = offer.offering_price
                const btitle = "Penawaran diterima";
                const stitle = "Menerima penawaran"
                const stemp = "acceptoffer";
                const btemp = "offeraccepted";
                const message = "Penawaran sebesar " + rupiah(price) + " diterima";
                mail.notifApp(btitle, bid, pid, message)
                mail.notifApp(stitle, sid, pid, message)
                mail.sendMail(bmail, btitle, btemp, bname, pname, price);
                mail.sendMail(semail, stitle, stemp, sname, pname, price);
              })
            })
          })
        })
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async listTransaksi(req, res) {
    transaksiService
      .list()
      .then((transaction) => {
        res.status(201).json(transaction);
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
      .find(req.params.id)
      .then((post) => {
        userService.findEmail(post.id_seller).then((seller) => {
          const sid = seller.id;
          const semail = seller.email;
          const sname = seller.name;
          userService.findEmail(post.id_buyer).then((buyer) => {
            const bid = buyer.id
            const bmail = buyer.email;
            const bname = buyer.name;
            productService.findProduct(post.id_product).then((product) => {
              const pid = product.id;
              const pname = product.name;
              penawaranService.findOffer(post.id_offering).then((offer) => {
                const price = offer.offering_price
                const btitle = "Penawaran ditolak";
                const stitle = "Menolak penawaran"
                const stemp = "refuseoffer";
                const btemp = "offerrejected";
                const message = "Penawaran sebesar " + rupiah(price) + " ditolak";
                mail.notifApp(btitle, bid, pid, message)
                mail.notifApp(stitle, sid, pid, message)
                mail.sendMail(bmail, btitle, btemp, bname, pname, price);
                mail.sendMail(semail, stitle, stemp, sname, pname, price);
              })
            })
          })
        })
      })
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

  async updateTransaction(req, res) {
    try {
      let updateArgs = {
        status: req.body.status,
      };
      await transaksiService
      .update(req.params.id, updateArgs)
      .then((transactions) => {
        res.status(200).json({
          status: "UPDATE_TRANSACTION_SUCCESS",
          transactions,
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
