const productRepository = require('../repositories/productRepository');

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
    findOne(id) {
        return productRepository.findOne(id);
    },
    findByCategory(id) {
        return productRepository.findByCategory(id);
    },
    getProduct(id) {
        return productRepository.findProductId(id);
    }
};