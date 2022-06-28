const categoryRepository = require("../repositories/categoryRepository");

module.exports = {
  async list() {
    try {
      const category = await categoryRepository.findAll();
      return { category };
    } catch (error) {
      throw err;
    }
  },

  findOne(id) {
    return categoryRepository.findOne(id);
  },
};
