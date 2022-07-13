const { Transaction } = require("../models");
const { Offering } = require("../models");
const { User } = require("../models");

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
  update(id, updateArgs) {
    return Transaction.update(updateArgs, {
      where: {
        id,
      },
    });
  },
};
