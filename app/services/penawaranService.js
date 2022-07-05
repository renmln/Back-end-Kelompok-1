const penawaranRepository = require("../repositories/penawaranRepository");

module.exports = {
  async create(requestBody) {
    return penawaranRepository.create(requestBody);
  },

  find(id) {
    return penawaranRepository.findPk(id);
  },

  async list() {
    try {
      const offerings = await penawaranRepository.findAll();
      return { offerings };
    } catch (err) {
      throw err;
    }
  },

  findByIdBuyer() {
    return penawaranRepository.findByIdBuyer(id);
  },

  findOffering(id) {
    return penawaranRepository.findOffering(id);
  },

  delete(id) {
    return penawaranRepository.delete(id);
  },
};
