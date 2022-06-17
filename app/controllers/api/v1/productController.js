const productService = require('../../../services/productService');

module.exports = {
    addProduct(req, res) {
        productService
        .create(req.body)
        .then((productService) => {
            res.status(201).json({
                status: "Created",
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
            res.status(201).json({
                status: "Updated",
                message: "Product has successfully updated"
            })
        })

    }
};