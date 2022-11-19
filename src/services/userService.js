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
const {
  sendEmail,
  sendPasswordChangedMail,
} = require("../helpers/mailService");

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
        await userRepository.updateUserPassword({
          userId: data.userId,
          password: hash,
        });
        const user = await userRepository.getUserById(data.userId);
        sendPasswordChangedMail({
          email: user.email,
          firstName: user.firstName,
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

  const number = Math.floor(100000 + Math.random() * 900000);

  const email = data.email;
  try {
    const user = await userRepository.getUser(email);
    if (!user) {
      return createOutput(404, "User not found");
    }
    await userRepository.deletePreviousOTP(user.id);
    const data = {
      toEmail: email,
      subject: "Reset password of ninety camera account",
      text: number,
    };

    sendEmail(data);
    await userRepository.addForgotPasswordOTP(user?.id, number.toString());
    var modiUser = user;
    delete modiUser["password"];
    return createOutput(200, { user: { ...user } });
  } catch (error) {
    return createOutput(500, "Error in finding the user");
  }
}

async function changePassword(data) {
  try {
    const forgotOTP = await userRepository.getForgotToken(data.userId);

    if (!forgotOTP) {
      return createOutput(404, "Not found");
    }
    const today = new Date();
    const createdDate = Date.parse(forgotOTP.createdAt);
    const diff = today - createdDate;
    const diffMinutes = Math.round(((diff % 86400000) % 3600000) / 60000);
    if (diffMinutes > 5) {
      await userRepository.deleteToken(data.userId);
      return createOutput(401, "OTP not valid");
    }

    if (forgotOTP.token.toString() !== data.token.toString()) {
      return createOutput(401, "Invalid OTP");
    }
    await resetPassword({
      userId: data.userId,
      password: data.password,
    });
    await userRepository.deleteToken(data.userId);
    return createOutput(200, "Password changed succesfully");
  } catch (error) {
    console.log("Error: ", error);
    return createOutput(500, "Error in updating the password");
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

async function getMobileDevice(userId) {
  try {
    const response = await userRepository.getMobileDevice(userId);
    if (response) {
      return createOutput(400, "Already exists");
    } else {
      return createOutput(200, "Not exists");
    }
  } catch (error) {
    throw error;
  }
}

async function getUserSystem(userId) {
  try {
    const response = await userRepository.getUserSystem(userId);
    return createOutput(200, { system: response });
  } catch (error) {
    return createOutput(500, "Error in gettin the system");
  }
}

async function getTotalUserCount() {
  try {
    const response = await userRepository.getDesktopUserCount();
    return createOutput(200, response);
  } catch (error) {
    return createOutput(500, "Error in getting the user count");
  }
}

async function getTotalMobileUserCount() {
  try {
    const response = await userRepository.getMobileUserCount();
    return createOutput(200, response);
  } catch (error) {
    return createOutput(500, "Error in getting the user count");
  }
}

async function getAllUsersWithDetails() {
  try {
    const response = await userRepository.getAllUsersWithDetails();
    return createOutput(200, response);
  } catch (error) {
    return createOutput(500, "Error in getting all the users");
  }
}

module.exports = {
  registerUser,
  logInUser,
  registerMobileDevice,
  resetPassword,
  resetPassword,
  resetUserPassword,
  getMobileDevice,
  getUserSystem,
  changePassword,
  getTotalUserCount,
  getTotalMobileUserCount,
  getAllUsersWithDetails,
};
