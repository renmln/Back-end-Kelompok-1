const { Transaction } = require("../models");

module.exports = {
  create(createArgs) {
    return Transaction.create(createArgs);
  },

  findPk(id) {
    return Transaction.findByPk(id);
  },

  findAll() {
    return Transaction.findAll({ include: [{ model: Offering }, { model: User }] });
  },

  delete(id) {
    return Transaction.destroy({ where: { id } });
  },
};
