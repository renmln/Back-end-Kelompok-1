const request = require("supertest");
const app = require("../../Back-end-Kelompok-1/app");

describe("GET /", () => {
  it("should return 200 OK", async () =>
    request(app)
      .get("/")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
          status: "OK",
          message: "Backend SecondHand is up and running!",
        });
      }));

  it("should return 404 Not Found", async () =>
    request(app)
      .get("/not-found")
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ ...res.body });
      }));
});
