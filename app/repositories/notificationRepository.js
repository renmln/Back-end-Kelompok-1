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
    findAll(id) {
        return Notification.findAll({
            where: {
                userId: id
            }
        },{
            limit: 10,
            order: 'createdAt DESC'
        })
    }
}