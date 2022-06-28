const notificationRepository = require('../repositories/notificationRepository');

module.exports = {
    create(title, userId, productId, message) {
        return notificationRepository.create(title, userId, productId, message)
    },
    findAll() {
        return notificationRepository.findAll()
    }
}