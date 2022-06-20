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

  //   findAll() {
  //     return User.findAll();
  //   },
};
