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

  findAll() {
    return Product.findAll(
      {
        include: [
          {
            model: Category,
          },
        ],
      },
      {
        where: {
          status: null,
        },
      }
    );
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

  findByCategory(id) {
    return Product.findAll(
      {
        include: [
          {
            model: Category,
          },
        ],
      },
      {
        where: {
          id_category: id,
        },
      }
    );
  },

  findProduct(id) {
    return Product.findOne({
      where: {
        id
      }
    })
  }
};
