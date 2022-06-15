const { User } = require("../models");

module.exports = {
  findByEmail(email) {
    return User.findOne({
      where: { email },
    });
  },

  findByPk(id) {
    return User.findByPk(id);
  },
};
