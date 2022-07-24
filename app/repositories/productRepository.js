const { Product } = require("../models");
const { Category } = require("../models");

module.exports = {
  create(createArgs) {
    return Product.create(createArgs);
  },

  update(id, updateArgs) {
    return Product.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  findMyProduct(id) {
    return Product.findAll({
      where: {
        id_seller: id,
      },
    });
  },

  findAllByIdSeller(id) {
    return Product.findAll({
      where: {
        id_seller: id,
      },
    });
  },

  findByCategory(type) {
    return Product.findAll({
      where: {
        category: type,
        status: null,
      },
    });
  },

  findProduct(id) {
    return Product.findOne({
      where: {
        id,
      },
    });
  },
};
