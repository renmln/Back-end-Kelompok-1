module.exports = {
  index(req, res) {
    res.status(200).send({
      status: "OK",
      message: "Backend Second Hand is up and running!",
    });
  },

  onLost(req, res) {
    res.status(404).json({
      status: "FAIL",
      message: "Route not found",
    });
  },

  onError(req, res, next) {
    res.status(500).json({
      status: "ERROR",
      error: {
        name: err.name,
        message: err.message,
      },
    });
  },
};
