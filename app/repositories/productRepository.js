const { Product } = require("../models");
const { Offering } = require("../models");

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
        return Product.findAll({
            where: {
                status : null 
            }
        })
    },
    findOne(id) {
        return Product.findOne({
            where: {
                id_seller : id
            }
        })
    },
    findByPk(id) {
        return Offering.findByPk({
            where: {
                id
            }
        })
    }
};