const { Notification, Product, User, Offering } = require("../models");

module.exports = {
    create(title, userId, productId, offeringId, message) {
        return Notification.create({
            userId,
            title,
            productId,
            offeringId,
            message
        })
    },
    findAll(id) {
        return Notification.findAll({
            where: {
                userId: id
            }
        }, {
            limit: 10,
            order: 'createdAt DESC'
        })
    },
    findByIdUser(id) {
        return Notification.findAll({
            where: {
                userId: id,
            },
            include: [{ model: Product }, { model: User }, { model: Offering }]
        }, {
            limit: 10,
            order: 'createdAt DESC'
        });
    },
    update(id, updateArgs) {
        return Notification.update(updateArgs, {
            where: {
                id,
            },
        });
    },
    deleteByProduct(productId) {
        return Notification.destroy({
            where: {
                productId,
            }
        })
    }
}