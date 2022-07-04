const { Offering } = require("../models");
const { User } = require("../models");
const { Product } = require("../models");

module.exports = {
  create(createArgs) {
    return Offering.create(createArgs, {
      include: [{ model: Product }, { model: User }],
    });
  },

  findPk(id) {
    return Offering.findByPk(id);
  },

  findAll() {
    return Offering.findAll({ include: [{ model: Product, model: User }] });
  },

  delete(id) {
    return Offering.destroy({
      where: { id },
    });
  },
};
