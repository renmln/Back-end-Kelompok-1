const userRepository = require("../repositories/userRepository");

module.exports = {
  async create(requestBody) {
    return userRepository.create(requestBody);
  },

  update(id, updateArgs) {
    return userRepository.update(id, updateArgs);
  },

  findId(id) {
    return userRepository.findId(id);
  },

  list() {
    return userRepository.findAll();
  },

  //   async update(id, requestBody) {
  //     return userRepository.update(id, requestBody);
  //   },

  //   async delete(id) {
  //     return userRepository.delete(id);
  //   },

  //   async find(id) {
  //     return userRepository.find(id);
  //   },

  //   async list() {
  //     try {
  //       const type_user = await userRepository.findAll();

  //       return {
  //         data: type_user,
  //       };
  //     } catch (err) {
  //       throw err;
  //     }
  //   },
};
