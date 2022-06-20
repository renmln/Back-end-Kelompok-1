const userService = require("../../../repositories/userRepository");

module.exports = {
  async updateProfile(req, res) {
    const user = await userService
      .update(req.params.id, req.body)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
};
