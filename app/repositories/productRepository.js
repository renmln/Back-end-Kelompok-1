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
    }
};