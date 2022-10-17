const app = require("../../app");
const request = require("supertest");

describe("Server test", () => {
  test("Server status test", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  }, 10000);
});
