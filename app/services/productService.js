const productRepository = require('../repositories/productRepository');

module.exports = {
    create(requestBody) {
        return productRepository.create(requestBody);
    }
};