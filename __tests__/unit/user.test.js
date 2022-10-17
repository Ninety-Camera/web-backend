const userRepository = require("../../src/repositories/userRepository");
const uuid = require("uuid");

describe("User unit tests", () => {
  test("User register test", async () => {
    // Registration tests
    const data = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: `${uuid.v4()}@gmail.com`,
      password: "TestPassword1@",
    };
    const response = await userRepository.registerUser(data);
    expect(response.email).toBe(data.email);
  });

  test("User register test - Reponse not containing password", async () => {
    // Registration test - Return not containing password check
    const data = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: `${uuid.v4()}@gmail.com`,
      password: "TestPassword1@",
    };
    const response = await userRepository.registerUser(data);
    expect(response.password).toBeUndefined();
  });
});
