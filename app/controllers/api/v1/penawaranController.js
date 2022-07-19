const penawaranService = require("../../../services/penawaranService");
const productService = require("../../../services/productService");
const productController = require("../v1/productController");
const userService = require("../../../services/userService");
const mail = require("./notificationController");
const jwt = require("jsonwebtoken");

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "Rahasia");
  } catch (error) {
    return null;
  }
}

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
      .then(( offerings ) => {
        res.status(201).json(offerings);
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async createPenawaran(req, res) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = verifyToken(token);

      const createArgs = {
        id_buyer: tokenPayload.id,
        id_product: req.body.id_product,
        offering_price: req.body.offering_price,
        no_hp: req.body.no_hp,
      };

      penawaranService.create(createArgs).then((post) => {
        res.status(200).json({
          status: "OK",
          post,
        });
        const price = post.offering_price;
        const bid = post.id_buyer;
        const oid = post.id;
        const buyer = userService.findUserEmail(bid).then((buyer) => {
          const bname = buyer.name;
          const bemail = buyer.email;
          const product = productService
            .findProduct(post.id_product)
            .then((product) => {
              const productName = product.product_name;
              const pid = product.id;
              const title = "Penawaran produk";
              const message = "Ditawar " + rupiah(price);
              const seller = userService
                .findUserEmail(product.id_seller)
                .then((seller) => {
                  const sid = seller.id;
                  const sname = seller.name;
                  const semail = seller.email;
                  const btemp = "offeringproduct";
                  const stemp = "getoffering";
                  let notif = mail.notifApp(
                    title,
                    bid,
                    pid,
                    oid,
                    message
                  );
                  notif = mail.notifApp(
                    title,
                    sid,
                    pid,
                    oid,
                    message);
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
      });
    } catch (err) {
      res.status(422).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async destroyPenawaran(req, res) {
    await penawaranService
      .findOffer(req.params.id)
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
                const oid = post.id_offering;
                const price = offer.offering_price
                const btitle = "Penawaran ditolak";
                const stitle = "Menolak penawaran"
                const stemp = "refuseoffer";
                const btemp = "offerrejected";
                const message = "Penawaran sebesar " + rupiah(price) + " ditolak";
                mail.notifApp(btitle, bid, pid, oid, message)
                mail.notifApp(stitle, sid, pid, oid, message)
                mail.sendMail(bmail, btitle, btemp, bname, pname, price);
                mail.sendMail(semail, stitle, stemp, sname, pname, price);
              })
            })
          })
        })
      })
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

  async findOneOffer(req, res) {
    try {
      const offers = await offerServices
        .findOffer(req.params.id)
        .then((offers) => {
          res.status(200).json(offers);
        })
    } catch (error) {
      res.status(422).json({
        status: "FAIL",
        message: err.message,
      })
    }
  },

  async findThisOffer(req, res) {
    try {
      // const bearerToken = req.headers.authorization;
      // const token = bearerToken.split("Bearer ")[1];
      // const tokenPayload = verifyToken(token);

      const offers = await penawaranService
        .findAllByIdProduct(req.params.id)
        .then((offers) => {
          res.status(200).json(offers);
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
        moveBy,
      });
    }
  },

  async findAllByIdBuyer(req, res) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = verifyToken(token);

      await penawaranService
        .findByIdBuyer(tokenPayload.id)
        .then((offerings) => {
          res.status(200).json(offerings);
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
