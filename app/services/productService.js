const productRepository = require("../repositories/productRepository");

module.exports = {
  create(requestBody) {
    return productRepository.create(requestBody);
  },

  update(id, requestBody) {
    return productRepository.update(id, requestBody);
  },

  findAll() {
    return productRepository.findAll();
  },

  findMyProduct(id) {
    return productRepository.findMyProduct(id);
  },

  findAllByIdSeller(id) {
    return productRepository.findAllByIdSeller(id);
  },

  findProduct(id) {
    return productRepository.findProduct(id);
  }
};
