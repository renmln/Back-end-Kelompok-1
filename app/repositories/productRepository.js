const { Product } = require("../models");

module.exports = {
    create(createArgs) {
        return Product.create(createArgs);
    }
};