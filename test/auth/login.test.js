const request = require("supertest");
const app = require("../../app");

describe("Login Endpoints", () => {
  const email = "user1@gmail.com";
  const password = "user123";
  const wrongEmail = "invalid@gmail.com";
  const wrongPassword = "invalid";

  it("should create a new token", async () => {
    const res = await request(app)
      .post("/api/v1/login")
      .send({
        email,
        password,
      })
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty(token, user);
      });
  });

  it("should respose with status code 404 as status code", async () => {
    const res = await request(app)
      .post(`/api/v1/login`)
      .send({
        email: wrongEmail,
        password,
      })
      .then((res) => {
        expect(res.statusCode).toEqual(404);
      });
  });

  it("should respose with status code 401 as status code", async () => {
    const res = await request(app)
      .post(`/api/v1/login`)
      .send({
        email,
        password: wrongPassword,
      })
      .then((res) => {
        expect(res.statusCode).toEqual(401);
      });
  });
});
