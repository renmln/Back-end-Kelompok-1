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

  findBuyer(id_buyer) {
    return penawaranRepository.findBuyer(id_buyer);
  },
};
