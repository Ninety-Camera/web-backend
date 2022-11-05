const cctvRepository = require("../../src/repositories/cctvRepository");
const userRepository = require("../../src/repositories/userRepository");
const uuid = require("uuid");

describe("System unit tests", () => {
  test("System add test ", async () => {
    const data = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: `${uuid.v4()}@gmail.com`,
      password: "TestPassword1@",
    };
    const response = await userRepository.registerUser(data);
    const system = await cctvRepository.addCCTVSystem({
      userId: response.id,
      cameraCount: 10,
    });
    expect(system.ownerId).toBe(response.id);
  }, 100000);
});
