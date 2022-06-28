const productService = require("../../../services/productService");
const cloudinary = require("../../../cloudinary");

module.exports = {
  async addProduct(req, res) {
    const products = await productService
      .create(req.body)
      .then((products) => {
        res.status(201).json(products);
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async updateProduct(req, res) {
    const products = await productService
      .update(req.params.id, req.body)
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
    const products = await productService
      .findAllByIdSeller(req.params.id)
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

  async uploadProductImages(req, res) {
    try {
      const imageUrlList = [];
      for (let i = 0; i < req.files.length; i++) {
        console.log(req.files[i]);
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
};
