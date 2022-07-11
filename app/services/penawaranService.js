const penawaranRepository = require("../repositories/penawaranRepository");

module.exports = {
  async create(requestBody) {
    return penawaranRepository.create(requestBody);
  },

  find(id) {
    return penawaranRepository.findPk(id);
  },

  list() {
    return penawaranRepository.findAll();
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

  findByIdBuyer(id) {
    return penawaranRepository.findByIdBuyer(id);
  },
};
