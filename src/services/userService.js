const bcrypt = require("bcrypt");
const createOutput = require("../helpers/createOutput");
const userRepository = require("../repositories/userRepository");
const cctvRepository = require("../repositories/cctvRepository");
const {
  userRegisterSchema,
  userSignInSchema,
  userPasswordResetSchema,
} = require("../validationSchemas/userSchema");
const { generateAccessToken } = require("../helpers/accessToken");
const {
  mobileDeviceValidationSchema,
} = require("../validationSchemas/mobileDeviceValidationSchema");
const { sendEmail } = require("../helpers/mailService");

async function resetPassword(data) {
  try {
    await userPasswordResetSchema.validateAsync(data);
  } catch (error) {
    return createOutput(401, "Validation error");
  }
  return new Promise(async (resolve, reject) => {
    bcrypt.hash(data.password, 10, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        resolve(createOutput(400, "Server error"));
      }
      try {
        const user = await userRepository.updateUserPassword({
          userId: data.userId,
          password: hash,
        });
        resolve(createOutput(201, "Password changed succesfully"));
      } catch (error) {
        resolve(createOutput(500, "Error in creating the user"));
      }
    });
  });
}

async function resetUserPassword(data) {
  if (!data?.email) {
    return createOutput(400, "Validation error");
  }
  const email = data.email;
  try {
    const user = await userRepository.getUser(email);
    if (!user) {
      return createOutput(404, "User not found");
    }
  } catch (error) {
    return createOutput(500, "Error in finding the user");
  }

  try {
    const data = {
      toEmail: email,
      subject: "Reset password of ninety camera account",
      text: "Here is tthe link",
    };

    sendEmail(data);
    return createOutput(200, "Email sended succesfully");
  } catch (error) {
    return createOutput(500, "Errorr occured while sending the email");
  }
}

async function logInUser(data) {
  if (!data) {
    return createOutput(400, "Invalid request");
  }
  try {
    await userSignInSchema.validateAsync({ ...data });
  } catch (error) {
    return createOutput(401, "Validation error!");
  }
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

async function registerMobileDevice(data) {
  try {
    await mobileDeviceValidationSchema.validateAsync({ ...data });
  } catch (error) {
    return createOutput(401, "Invalid data");
  }
  try {
    await userRepository.registerMobileDevice(data);
    const cctv = await cctvRepository.getCCTVSystem(data.systemId);
    return createOutput(201, { system: cctv });
  } catch (error) {
    return createOutput(500, "Error in adding the mobile device");
  }
}

module.exports = {
  registerUser,
  logInUser,
  registerMobileDevice,
  resetPassword,
  resetPassword,
  resetUserPassword,
};
