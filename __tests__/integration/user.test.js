const userService = require("../../src/services/userServie");
const uuid = require("uuid");

describe("User integration tests", () => {
  // Check whether the use registration occurs correctly or not
  test("User register test", async () => {
    const data = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: `${uuid.v4()}@gmail.com`,
      password: "TestPassword1@",
    };
    const response = await userService.registerUser(data);
    expect(response.status).toBe(201);
  });

  // Check whether what happen when sending an null object
  // to user register function
  test("User register test - null object", async () => {
    const data = null;
    const response = await userService.registerUser(data);
    expect(response.status).toBe(401);
  });

  // Check whether the user registration receives the token
  test("User register test - token", async () => {
    const data = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: `${uuid.v4()}@gmail.com`,
      password: "TestPassword1@",
    };
    const response = await userService.registerUser(data);
    expect(response.data.token).not.toBeUndefined();
  });

  // Check whether the user registration fails when sending
  // empty parameters to the registration
  test("User register test - empty first name", async () => {
    // With the firstname null
    const data = {
      firstName: null,
      lastName: uuid.v4(),
      email: `${uuid.v4()}@gmail.com`,
      password: "TestPassword1@",
    };
    const response = await userService.registerUser(data);
    expect(response.status).toBe(401);
  });

  // Check whether the user registration fails when sending
  // empty parameters to the registration
  test("User register test - empty last name", async () => {
    // With the lastName null
    const data = {
      firstName: uuid.v4(),
      lastName: null,
      email: `${uuid.v4()}@gmail.com`,
      password: "TestPassword1@",
    };
    const response = await userService.registerUser(data);
    expect(response.status).toBe(401);
  });

  // Check whether the user registration fails when sending
  // empty parameters to the registration
  test("User register test - emapty email", async () => {
    // With the email null
    const data = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: null,
      password: "TestPassword1@",
    };
    const response = await userService.registerUser(data);
    expect(response.status).toBe(401);
  });

  // Check whether the user registration fails when sending
  // empty parameters to the registration
  test("User register test - empty password", async () => {
    // With the password null
    const data = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: `${uuid.v4()}@gmail.com`,
      password: "",
    };
    const response = await userService.registerUser(data);
    expect(response.status).toBe(401);
  });

  // Check whether the user registration fails when sending
  // wrong values to the function
  test("User register test - invalid email", async () => {
    // With a invalid email
    const data = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: "testemail",
      password: "TestPassword1@",
    };
    const response = await userService.registerUser(data);
    expect(response.status).toBe(401);
  });

  // Check whether the user registration fails when sending
  // wrong values to the function
  test("User register test - invalid password", async () => {
    // With a invalid password
    const data = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: `${uuid.v4()}@gmail.com`,
      password: "wrongpassword",
    };
    const response = await userService.registerUser(data);
    expect(response.status).toBe(401);
  });

  // Check user login sucessfully
  test("User login test", async () => {
    const data = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: `${uuid.v4()}@gmail.com`,
      password: "TestPassword1@",
    };
    await userService.registerUser(data);
    const response = await userService.logInUser({
      email: data.email,
      password: data.password,
    });
    expect(response.status).toBe(200);
  });

  // Check what happen when sending a null object to user login function
  test("User login test - null object", async () => {
    const response = await userService.logInUser(null);
    expect(response.status).toBe(400);
  });

  // Check what happen when sending a empty values when logining request body
  test("User login test - empty email", async () => {
    const data = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: `${uuid.v4()}@gmail.com`,
      password: "TestPassword1@",
    };
    await userService.registerUser(data);
    const response = await userService.logInUser({
      email: "",
      password: data.password,
    });
    expect(response.status).toBe(400);
  });

  // Check what happen when sending a empty values when logining request body
  test("User login test - empty password", async () => {
    const data = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: `${uuid.v4()}@gmail.com`,
      password: "TestPassword1@",
    };
    await userService.registerUser(data);
    const response = await userService.logInUser({
      email: data.email,
      password: "",
    });
    expect(response.status).toBe(400);
  });

  // Check what happen when sending a invalid email when logining request body
  test("User login test - invalid email", async () => {
    const data = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: `${uuid.v4()}@gmail.com`,
      password: "TestPassword1@",
    };
    await userService.registerUser(data);
    const response = await userService.logInUser({
      email: "invalidemail",
      password: data.password,
    });
    expect(response.status).toBe(400);
  });

  // Check user login returns the token
  test("User login test - token", async () => {
    const data = {
      firstName: uuid.v4(),
      lastName: uuid.v4(),
      email: `${uuid.v4()}@gmail.com`,
      password: "TestPassword1@",
    };
    await userService.registerUser(data);
    const response = await userService.logInUser({
      email: data.email,
      password: data.password,
    });
    expect(response.data.token).not.toBeUndefined();
  });
});
