const { User } = require("../models");

module.exports = {
  findByEmail(email) {
    return User.findOne({
      where: { email },
    });
  },

  findPk(id) {
    return User.findByPk(id);
  },
};
