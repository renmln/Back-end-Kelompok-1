const userService = require("../../../repositories/userRepository");
const cloudinary = require("../../../cloudinary");

module.exports = {
  async uploadPhoto(req, res) {
    console.log(req.file);
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;
    cloudinary.uploader.upload(file, function (err, result) {
      if (!!err) {
        console.log(err);
        return res.status(400).json({
          message: "Gagal upload file!",
        });
      }

      res.status(201).json({
        message: "Upload image berhasil",
        url: result.url,
      });
    });
  },

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

  async findUserById(req, res) {
    const user = await userService
      .findId(req.params.id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
};
