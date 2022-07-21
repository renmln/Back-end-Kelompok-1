const { Token } = require("../models");

module.exports = {
    findToken(id, token){
        return Token.findOne({
            where: {
                id_user: id,
                token: token,
            }
        })
    },
}