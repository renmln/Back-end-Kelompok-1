const { User } = require('../models');

module.exports = {
    update(id, updateArgs) {
        return User.update(updateArgs, {
            where : {
                id
            }
        })
    }
}