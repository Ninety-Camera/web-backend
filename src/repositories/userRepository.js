const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function registerUser(data) {
  try {
    const user = await prisma.user.create({ data: { ...data } });
    delete user["password"];
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: { CCTV_System: true },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

async function registerMobileDevice(data) {
  try {
    const mobileDevice = await prisma.mobile_Device.create({ data: data });
    return mobileDevice;
  } catch (error) {
    throw error;
  }
}

module.exports = { registerUser, getUser, registerMobileDevice };
