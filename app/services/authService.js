const authRepository = require("../repositories/authRepository");

module.exports = {
  get(email) {
    return authRepository.find(email);
  },
  getPk(id) {
    return authRepository.findPk(id);
  },

  async login(req, res) {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    const user = await authRepository.findByEmail(email, password);

    if (!user) {
      throw new Error("Email tidak terdaftar");
    }

    const isPasswordCorrect = await checkPassword(user.password, password);

    if (!isPasswordCorrect) {
      throw new Error("Password salah!");
    }

    const token = createToken({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    return {
      id: user.id,
      email: user.email,
      token: token,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
};
