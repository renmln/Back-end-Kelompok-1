const tokenRepository = require('../repositories/tokenRepository')

module.exports = {
    findToken(id, token) {
        return tokenRepository.findToken(id, token);
    },
}