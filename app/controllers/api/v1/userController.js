const userService = require("../../../repositories/userRepository");
const cloudinary = require("../../../cloudinary");
const { promisify } = require("util");
const cloudinaryUpload = promisify(cloudinary.uploader.upload);
const cloudinaryDestroy = promisify(cloudinary.uploader.destroy);
const jwt = require("jsonwebtoken");

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "Rahasia");
  } catch (error) {
    return null;
  }
}

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

  async updateInfoAkun(req, res) {
    try {
      // Cek Token dan Ambil isi tokennya
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = verifyToken(token);

      const user = JSON.parse(
        JSON.stringify(await userService.findId(tokenPayload.email))
      ); // Ambil data user dari database
      delete user.password;

      // Cek apakah ada file yang di upload
      if (req.file === undefined || req.file === null) {
        user.name = req.body.name;
        user.city = req.body.city;
        user.address = req.body.address;
        user.no_hp = req.body.no_hp;
        user.updatedAt = new Date();
      } else {
        // Hapus foto lama
        if (user.photo_profile !== null) {
          const oldImage = user.photo_profile.substring(65, 85);
          await cloudinaryDestroy(oldImage);
        }
        // Upload foto baru
        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;
        const result = await cloudinaryUpload(file);
        const url = result.secure_url;

        // Masukan ke object Args
        user.name = req.body.name;
        user.city = req.body.city;
        user.address = req.body.address;
        user.no_hp = req.body.no_hp;
        user.photo_profile = url;
        user.updatedAt = new Date();
      }

      await userService.update(user.id, user);
      delete user.password;

      res.status(200).json({
        status: "UPDATE_SUCCESS",
        message: "User Updated",
        user,
      });
    } catch (error) {
      res.status(500).json({
        status: "FAIL",
        message: error.message,
      });
    }
  },

  async findUserById(req, res) {
    const user = await userService
      .findUserID(req.params.id)
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
