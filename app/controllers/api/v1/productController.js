const productService = require('../../../services/productService');

module.exports = {
    addProduct(req, res){
        productService
        .create({
            id_seller: req.body.id_seller,
            product_name: req.body.product_name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            image_1: req.body.image_1,
            image_2: req.body.image_2,
            image_3: req.body.image_3,
            image_4: req.body.image_4
        })
        .then((Car) => {
            res.status(201).json({
                status: "Product successfully added",
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