const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dg6ezwc4v",
  api_key: "666123536939281", // TODO: Ganti dengan API Key-mu
  api_secret: "EjtVRYRE09B_I-DfV-A6IqLv_eQ",
  secure: true,
});

module.exports = cloudinary;
