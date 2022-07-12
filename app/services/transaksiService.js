const transaksiRepository = require("../repositories/transaksiRepository");

module.exports = {
  async create(requestBody) {
    return transaksiRepository.create(requestBody);
  },

  find(id) {
    return transaksiRepository.findPk(id);
  },

  // async list() {
  //   try {
  //     const transactions = await transaksiRepository.findAll();
  //     return { transactions };
  //   } catch (err) {
  //     throw err;
  //   }
  // },

  findAll() {
    return transaksiRepository.findAll();
  },

  async delete(id) {
    return transaksiRepository.delete(id);
  },
};
