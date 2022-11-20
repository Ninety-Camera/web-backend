const app = require("../../app");
const request = require("supertest");
const uuid = require("uuid");

describe("Server test", () => {
  test("Server status test", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
  test("User registration test", async () => {
    const user = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: `${uuid.v4()}@gmail.com`,
      password: "TestPassword1@",
    };
    const response = await await request(app)
      .post("/api/user/register")
      .send({ ...user });
    expect(response.body.status).toBe(201);
  });
  test("User registration fail test", async () => {
    const user = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: `${uuid.v4()}@gmail.com`,
    };
    const response = await await request(app)
      .post("/api/user/register")
      .send({ ...user });
    expect(response.body.status).toBe(400);
  });
  test("User login test", async () => {
    const user = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: `${uuid.v4()}@gmail.com`,
      password: "TestPassword1@",
    };
    const registerRes = await await request(app)
      .post("/api/user/register")
      .send({ ...user });
    const loginRes = await request(app)
      .post("/api/user/login")
      .send({ email: user.email, password: user.password });
    expect(loginRes.body.status).toBe(200);
  });
  test("User login fail test", async () => {
    const user = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: `${uuid.v4()}@gmail.com`,
      password: "TestPassword1@",
    };
    const registerRes = await await request(app)
      .post("/api/user/register")
      .send({ ...user });
    const loginRes = await request(app)
      .post("/api/user/login")
      .send({ email: user.email, password: "Fakepassword1@" });
    expect(loginRes.body.status).toBe(400);
  });
});
