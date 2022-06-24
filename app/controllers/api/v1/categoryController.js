const categoryService = require("../../../services/categoryService");

module.exports = {
  async listCategory(req, res) {
    categoryService
      .list()
      .then(({ category }) => {
        res.status(201).json({
          status: "OK",
          data: category,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async findById(req, res) {
    const categories = await categoryService
      .findOne(req.params.id)
      .then((categories) => {
        res.status(200).json(categories);
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
};
