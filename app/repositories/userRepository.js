const { User } = require("../models");

module.exports = {
  create(createArgs) {
    return User.create(createArgs);
  },

  update(id, updateArgs) {
    return User.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  findId(id) {
    return User.findOne({
      where: {
        email: id,
      },
    });
  },
  
  findUserEmail(id) {
    return User.findOne({
      where: {
        id
      }
    })
  },

  findAll() {
    return User.findAll();
  },

  //   update(id, updateArgs) {
  //     return User.update(updateArgs, {
  //       where: {
  //         id,
  //       },
  //     });
  //   },

  //   delete(id) {
  //     return User.destroy({ where: { id } });
  //   },

  //   find(id) {
  //     return User.findByPk({ where: { id } });
  //   },

  //
};
