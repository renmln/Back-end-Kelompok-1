const { Category } = require("../models");

module.exports = {
  findAll() {
    return Category.findAll();
  },

  find(id) {
    return Category.findOne({ where: { id } });
  },
};
