const { Notification } = require("../models");

module.exports = {
    create(title, userId, productId, message) {
        return Notification.create({
            userId,
            title,
            productId,
            message
        })
    },
    findAll() {
        return Notification.findAll({
            limit: 10,
            order: 'createdAt DESC'
        })
    }
}