const userRepository = require("../../src/repositories/userRepository");
const uuid = require("uuid");

describe("User test", () => {
  test("User register test", async () => {
    const data = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: `${uuid.v4()}@gmail.com`,
      password: "TestPassword1@",
    };
    const response = await userRepository.registerUser(data);
    expect(response.email).toBe(data.email);
  });
});
