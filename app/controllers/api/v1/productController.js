const productService = require('../../../services/productService');

module.exports = {
    async addProduct(req, res) {
        const products = await productService
        .create(req.body)
        .then((products) => {
            res.status(201).json(products)
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
            res.status(200).json(products)
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
            res.status(200).json(products)
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
        .findOne(req.params.id)
        .then((products) => {
            res.status(200).json(products)
        })
        .catch((err) => {
            res.status(422).json({
                status: "FAIL",
                message: err.message,
            });
        });
    }
};