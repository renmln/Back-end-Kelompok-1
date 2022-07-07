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

  delete(id) {
    return penawaranRepository.delete(id);
  },

  findOffer(id) {
    return penawaranRepository.findOffer(id);
  },

  findAllByIdProduct(id) {
    return penawaranRepository.findAllByIdProduct(id);
  },

  findByIdBuyer() {
    return penawaranRepository.findByIdBuyer(id);
  },
};
