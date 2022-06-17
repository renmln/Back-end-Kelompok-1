const { Offering } = require("../models");

module.exports = {
  create(createArgs) {
    return Offering.create(createArgs);
  },

  findPk(id) {
    return Offering.findByPk(id);
  },

  findAll() {
    return Offering.findAll({ include: [{ model: Product, model: User }] });
  },
};
