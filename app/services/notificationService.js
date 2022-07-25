const notificationRepository = require('../repositories/notificationRepository');
const productRepository = require('../repositories/productRepository');

module.exports = {
    create(title, userId, productId, offeringId, message) {
        return notificationRepository.create(title, userId, productId, offeringId, message)
    },
    findAll() {
        return notificationRepository.findAll()
    },
    findByIdUser(id) {
        return notificationRepository.findByIdUser(id);
    },
    update(id, updateArgs) {
        return notificationRepository.update(id, updateArgs);
    },
    deleteByProduct(productId) {
        return notificationRepository.deleteByProduct(productId);
    }
}