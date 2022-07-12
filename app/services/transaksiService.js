const transaksiRepository = require("../repositories/transaksiRepository");

module.exports = {
  async create(requestBody) {
    return transaksiRepository.create(requestBody);
  },

  find(id) {
    return transaksiRepository.findPk(id);
  },

  async list() {
    return transaksiRepository.findAll();
  },

  async delete(id) {
    return transaksiRepository.delete(id);
  },
};
