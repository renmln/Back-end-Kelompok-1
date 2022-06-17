const { Product } = require("../models");

module.exports = {
    create(createArgs) {
        return Product.create(createArgs);
    },
    update(id, updateArgs){
        return Product.update(updateArgs, {
            where: {
                id
            }
        })
    },
    findAll() {
        return Product.findAll()
    },
    findOne(id) {
        return Product.findOne({
            where: {
                id_seller : id
            }
        })
    }
};