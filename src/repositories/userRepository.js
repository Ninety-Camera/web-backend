const { PrismaClient } = require("@prisma/client");
const { transformDocument } = require("@prisma/client/runtime");

const prisma = new PrismaClient();

async function updateUserPassword(data) {
  try {
    const user = await prisma.user.update({
      data: { password: data.password },
      where: { id: data.userId },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

async function registerUser(data) {
  try {
    const user = await prisma.user.create({ data: { ...data } });
    delete user["password"];
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        email: true,
        firstName: true,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },

      include: { UserSystem: true, CCTV_System: true },
    });
    if (user.UserSystem) {
      const system = await prisma.cCTV_System.findUnique({
        where: { id: user.UserSystem.systemId },
      });
      return { ...user, CCTV_System: system };
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function registerMobileDevice(data) {
  try {
    const mobileDevice = prisma.mobile_Device.create({ data: data });
    const addUserRelationship = prisma.userSystem.create({
      data: { systemId: data.systemId, userId: data.ownerId },
    });
    const [mobileResult, userSubscriptionResult] = await prisma.$transaction([
      mobileDevice,
      addUserRelationship,
    ]);
    return mobileResult;
  } catch (error) {
    throw error;
  }
}

async function getMobileDevice(userId) {
  try {
    const response = await prisma.mobile_Device.findUnique({
      where: { ownerId: userId },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function getUserSystem(userId) {
  try {
    const response = await prisma.cCTV_System.findUnique({
      where: { ownerId: userId },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function addForgotPasswordOTP(userId, otp) {
  try {
    const response = await prisma.forgot_Code.create({
      data: { userId: userId, token: otp },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function getForgotToken(userId) {
  try {
    const response = await prisma.forgot_Code.findUnique({
      where: {
        userId: userId,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function deleteToken(userId) {
  try {
    const response = await prisma.forgot_Code.delete({
      where: {
        userId: userId,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function deletePreviousOTP(userId) {
  try {
    const response = await prisma.forgot_Code.deleteMany({
      where: {
        userId: userId,
      },
    });
    return true;
  } catch (error) {
    throw error;
  }
}

async function getDesktopUserCount() {
  try {
    const response = await prisma.user.count({
      where: {
        role: "ADMIN",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function getMobileUserCount() {
  try {
    const response = await prisma.user.count({
      where: {
        role: "USER",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function getAllUsersWithDetails() {
  try {
    const response = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerUser,
  getUser,
  registerMobileDevice,
  updateUserPassword,
  getMobileDevice,
  getUserSystem,
  addForgotPasswordOTP,
  getForgotToken,
  deleteToken,
  deletePreviousOTP,
  getUserById,
  getDesktopUserCount,
  getMobileUserCount,
  getAllUsersWithDetails,
};
