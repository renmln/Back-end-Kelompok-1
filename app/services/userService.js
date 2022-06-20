const userRepository = require('../repositories');

module.exports = {
    update(id, updateArgs) {
        return userRepository.update(id, updateArgs);
    }
}