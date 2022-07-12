const { Transaction } = require("../models");
const { Offering } = require("../models");
const { User } = require("../models");

module.exports = {
  create(createArgs) {
    return Transaction.create(createArgs);
  },

  update(id, updateArgs) {
    return User.update(updateArgs, {
      where: {
        id,
      },
    });
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
