const productRepository = require('../repositories/productRepository');

module.exports = {
    create(requestBody) {
        return productRepository.create(requestBody);
    },
    update(id, requestBody) {
        return productRepository.update(requestBody, {
            where: {
                id
            }
        })
    }
};