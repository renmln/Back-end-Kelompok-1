const productService = require("../../../services/productService");
const userService = require("../../../services/userService");
const mail = require("./notificationController");
const cloudinary = require("../../../cloudinary");
const jwt = require("jsonwebtoken");
const { image } = require("../../../cloudinary");
const { json } = require("body-parser");

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "Rahasia");
  } catch (error) {
    return null;
  }
}

module.exports = {
  async addProduct(req, res) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = verifyToken(token);

      const imageUrlList = [];
      for (let i = 0; i < req.files.length; i++) {
        const fileBase64 = req.files[i].buffer.toString("base64");
        const file = `data:${req.files[i].mimetype};base64,${fileBase64}`;
        const result = await cloudinary.uploader.upload(file);
        imageUrlList.push(result.url);
      }

      if (imageUrlList.length === 1)
        (image_1 = imageUrlList[0]),
          (image_2 = null),
          (image_3 = null),
          (image_4 = null);
      if (imageUrlList.length === 2)
        (image_1 = imageUrlList[0]),
          (image_2 = imageUrlList[1]),
          (image_3 = null),
          (image_4 = null);
      if (imageUrlList.length === 3)
        (image_1 = imageUrlList[0]),
          (image_2 = imageUrlList[1]),
          (image_3 = imageUrlList[2]),
          (image_4 = null);
      if (imageUrlList.length === 4)
        (image_1 = imageUrlList[0]),
          (image_2 = imageUrlList[1]),
          (image_3 = imageUrlList[2]),
          (image_4 = imageUrlList[3]);

      const createArgs = {
        id_seller: tokenPayload.id,
        product_name: req.body.product_name,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        image_1,
        image_2,
        image_3,
        image_4,
      };

      productService.create(createArgs).then((products) => {
        res.status(201).json({
          status: "PRODUCT_ADDED",
          products,
        });
        // ini masih error
        const title = "Berhasil di ditambahkan";
        const userId = products.id_seller;
        const productId = products.id;
        const productName = products.product_name;
        const price = products.price;
        const message = null;
        const notif = mail.notifApp(title, userId, productId, message);
        const user = userService.findEmail(userId).then((user) => {
          const email = user.email;
          const subject = "Menambahkan produk";
          const template = "addproduct";
          const name = user.name;
          const send = mail.sendMail(
            email,
            subject,
            template,
            name,
            productName,
            price
          );
        });
      });
    } catch (err) {
      res.status(422).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async updateProduct(req, res) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenpayload = verifyToken(token);

      // Delete Foto Produk Lama
      if (req.files.length !== 0) {
        const product = await productService.findProduct(req.params.id);
        const oldImageList = [
          product.image_1,
          product.image_2,
          product.image_3,
          product.image_4,
        ];
        for (let i = 0; i < oldImageList.length; i++) {
          if (oldImageList[i] !== null) {
            cloudinary.uploader.destroy(oldImageList[i].substring(65, 85));
          }
        }
      }

      // Upload Foto Produk Baru
      const imageUrlList = [];
      if (req.files.length !== 0) {
        for (let i = 0; i < req.files.length; i++) {
          const fileBase64 = req.files[i].buffer.toString("base64");
          const file = `data:${req.files[i].mimetype};base64,${fileBase64}`;
          const result = await cloudinary.uploader.upload(file);
          imageUrlList.push(result.url);
        }
      }
      if (imageUrlList.length === 0)
        (image_1 = null), (image_2 = null), (image_3 = null), (image_4 = null);
      if (imageUrlList.length === 1)
        (image_1 = imageUrlList[0]),
          (image_2 = null),
          (image_3 = null),
          (image_4 = null);
      if (imageUrlList.length === 2)
        (image_1 = imageUrlList[0]),
          (image_2 = imageUrlList[1]),
          (image_3 = null),
          (image_4 = null);
      if (imageUrlList.length === 3)
        (image_1 = imageUrlList[0]),
          (image_2 = imageUrlList[1]),
          (image_3 = imageUrlList[2]),
          (image_4 = null);
      if (imageUrlList.length === 4)
        (image_1 = imageUrlList[0]),
          (image_2 = imageUrlList[1]),
          (image_3 = imageUrlList[2]),
          (image_4 = imageUrlList[3]);

      const id_seller = tokenpayload.id;
      // Argumen untuk update produk
      let updateArgs = {
        // id_seller: id_seller,
        product_name: req.body.product_name,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
      };

      if (imageUrlList.length > 0) {
        updateArgs = {
          ...updateArgs,
          image_1,
          image_2,
          image_3,
          image_4,
        };
      }

      if (req.body.status) {
        updateArgs = {
          status: req.body.status
        };
      }

      await productService
        .update(req.params.id, updateArgs)
        .then((products) => {
          res.status(200).json({
            status: "UPDATE_PRODUCT_SUCCESS",
            products,
          });
          // let title = "Berhasil di perbarui";
          // const userId = products.id_seller;
          // const productId = products.id;
          // const productName = products.product_name;
          // const price = products.price;
          // const message = null;
          // const notif = mail.notifApp(title, userId, productId, message);
          // const user = userService.findEmail(userId).then((user) => {
          //     const email = user.email;
          //     const subject = "Mengubah detail produk";
          //     const template = "updateproduct";
          //     const name = user.name;
          //     const send = mail.sendMail(email, subject, template, name, productName, price);
          // });
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
      });
    }
  },

  async findAllProduct(req, res) {
    const products = await productService
      .findAll()
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async findMyProduct(req, res) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = verifyToken(token);

      await productService
        .findAllByIdSeller(tokenPayload.id)
        .then((products) => {
          res.status(200).json(products);
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
      });
    }
  },

  async findOneProduct(req, res) {
    try {
      const products = await productService
        .findProduct(req.params.id)
        .then((products) => {
          res.status(200).json(products);
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
      });
    }
  },

  async uploadProductImages(req, res) {
    try {
      const imageUrlList = [];
      for (let i = 0; i < req.files.length; i++) {
        const fileBase64 = req.files[i].buffer.toString("base64");
        const file = `data:${req.files[i].mimetype};base64,${fileBase64}`;
        const result = await cloudinary.uploader.upload(file);
        imageUrlList.push(result.url);
      }
      res.status(201).json({
        message: "Upload image berhasil",
        url: imageUrlList,
      });
    } catch (err) {
      res.status(422).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async findProductsByCategory(req, res) {
    const products = await productService.findByCategory(req.params.category)
      .then((products) => {
        res.status(200).json(products)
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      })
  }
};
