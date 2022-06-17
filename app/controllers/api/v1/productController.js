const productService = require('../../../services/productService');

module.exports = {
    addProduct(req, res) {
        productService
        .create(req.body)
        .then((productService) => {
            res.status(201).json({
                status: "OK",
                message: "Product has successfully added"
            })
          })
        .catch((err) => {
            res.status(422).json({
                status: "FAIL",
                message: err.message,
            });
        });
    },

    updateProduct(req, res) {
        productService
        .update(req.params.id, req.body)
        .then((productService) => {
            res.status(200).json({
                status: "OK",
                message: "Product has successfully updated"
            })
        })
        .catch((err) => {
            res.status(422).json({
                status: "FAIL",
                message: err.message,
            });
        });

    },

    findAllProduct(req, res) {
        productService
        .findAll()
        .then((productService) => {
            res.status(200).json({
                status: "OK",
                message: "Products has successfully loaded"
            })
        })
        .catch((err) => {
            res.status(422).json({
                status: "FAIL",
                message: err.message,
            });
        });
    },

    findMyProduct(req, res) {
        productService
        .findOne(req.params.id)
        .then((productService) => {
            res.status(200).json({
                status: "OK",
                message: "Products has successfully loaded"
            })
        })
        .catch((err) => {
            res.status(422).json({
                status: "FAIL",
                message: err.message,
            });
        });
    }
};