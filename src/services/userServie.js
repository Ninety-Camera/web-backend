const bcrypt = require("bcrypt");
const createOutput = require("../helpers/createOutput");
const userRepository = require("../repositories/userRepository");
const { userRegisterSchema } = require("../validationSchemas/userSchema");
const { generateAccessToken } = require("../helpers/accessToken");

async function logInUser(data) {
  try {
    const user = await userRepository.getUser(data.email);
    if (!user) {
      return createOutput(400, "User not found");
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(data.password, user.password, function (err, result) {
        if (result) {
          const modiUser = { ...user };
          delete modiUser["password"];
          resolve(
            createOutput(200, {
              user: modiUser,
              token: generateAccessToken({ id: user.id, email: user.email }),
            })
          );
        } else {
          resolve(createOutput(400, "Invalid username or password"));
        }
      });
    });
  } catch (error) {
    console.log("Error occured: ", error);
    return createOutput(400, "Error in getting the user");
  }
}

async function registerUser(data) {
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
        resolve(
          createOutput(201, {
            user,
            token: generateAccessToken({ id: user.id, email: user.email }),
          })
        );
      } catch (error) {
        resolve(createOutput(500, "Error in creating the user"));
      }
    });
  });
}

module.exports = {
  registerUser,
  logInUser,
};
