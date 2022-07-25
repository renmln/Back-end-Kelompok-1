const request = require("supertest");
const bcrypt = require("bcryptjs");
const SALT = 10;
const app = require("../../app");
const { User } = require("../../app/models");

describe("POST api/v1/login", () => {
  jest.setTimeout("40000");
  const emailLogin = "renamuliani@gmail.com";
  const passwordLogin = "rena123";
  const wrongEmail = "invalid@gmail.com";
  const wrongPassword = "invalid";
  const passowrdHash = bcrypt.hashSync(passwordLogin, SALT);

  const data = {
    email: emailLogin,
    password: passowrdHash,
  };

  // const user = JSON.parse(JSON.stringify(data));
  beforeEach(async () => {
    const user = await User.findOne({ where: { email: wrongEmail } });
    JSON.parse(JSON.stringify(user));
    if (user != null) {
      await user.destroy({ where: { email: wrongEmail } });
    }
  });

  afterEach(async () => {
    const user = await User.findOne({ where: { email: emailLogin } });
    JSON.parse(JSON.stringify(user));

    if (user == null) {
      await user.destroy({ where: { email: emailLogin } });
    }
  });

  it("should return status code 200 and access token", async () => {
    const res = await request(app)
      .post("/api/v1/login")
      .set("Content-Type", "application/json")
      .send({ email: data.email, password: passwordLogin })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.accessToken).toEqual(res.body.accessToken);
      });
  });

  it("should return status code 404 email not registered", async () => {
    const res = await request(app)
      .post("/api/v1/login")
      .set("Content-Type", "application/json")
      .send({
        email: wrongEmail,
        password: passwordLogin,
      })
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
          message: "Email tidak ditemukan",
        });
      });
  });

  it("should respose with status code 401 password incorrect", async () => {
    const res = await request(app)
      .post("/api/v1/login")
      .set("Content-Type", "application/json")
      .send({
        email: data.email,
        password: wrongPassword,
      })
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({
          message: "Password salah!",
        });
      });
  });
});
