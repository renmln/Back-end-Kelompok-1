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
    return Product.findAll({
      where: [
        {
          status: null,
        },
      ],
    });
  },

  findOne(id) {
    return Product.findOne({
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
};
