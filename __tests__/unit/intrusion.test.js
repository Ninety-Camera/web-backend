const intrusionRepository = require("../../src/repositories/intrusionRepository");
const cctvRepository = require("../../src/repositories/cctvRepository");
const userRepository = require("../../src/repositories/userRepository");
const uuid = require("uuid");

describe("Intrusion test", () => {
  test("Intrusion add test - Fake System Id", async () => {
    try {
      const response = await intrusionRepository.addIntrusion({
        systemId: "fake-one",
      });
    } catch (error) {
      expect(error.message).toBe("Database Error");
    }
  });
  test("Intrusion add test - Correct System Id", async () => {
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
    const intrusionResponse = await intrusionRepository.addIntrusion({
      systemId: system.id,
    });
    expect(intrusionResponse.systemId).toBe(system.id);
  }, 100000);
});
