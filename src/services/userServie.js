const createOutput = require("../helpers/createOutput");
const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const { userRegisterSchema } = require("../validationSchemas/userSchema");

async function registerUser(data) {
  // Validate the user
  try {
    await userRegisterSchema.validateAsync({ ...data });
  } catch (error) {
    return createOutput(401, "Validation error!");
  }
  return new Promise(async (resolve, reject) => {
    bcrypt.hash(data.password, 10, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        resolve(createOutput(400, "Server error"));
      }
      try {
        const user = await userRepository.registerUser({
          ...data,
          password: hash,
        });
        resolve(createOutput(201, user));
      } catch (error) {
        resolve(createOutput(500, "Error in creating the user"));
      }
    });
  });
}

module.exports = {
  registerUser,
};
