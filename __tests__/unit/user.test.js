const userRepository = require("../../src/repositories/userRepository");
const cctvRepository = require("../../src/repositories/cctvRepository");
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
  }, 10000);

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
  }, 10000);

  test("User device register test", async () => {
    // Registration test - Return not containing password check
    const data = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: `${uuid.v4()}@gmail.com`,
      password: "TestPassword1@",
    };
    const user = await userRepository.registerUser(data);
    const system = await cctvRepository.addCCTVSystem({
      userId: user.id,
      cameraCount: 10,
    });
    const deviceData = {
      ownerId: user.id,
      id: uuid.v4(),
      systemId: system.id,
    };
    const deviceRegister = await userRepository.registerMobileDevice(
      deviceData
    );
    expect(deviceRegister.ownerId).toBe(user.id);
  }, 10000);
});
