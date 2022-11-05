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
      include: { UserSystem: true, CCTV_System: true },
    });
    if (user.UserSystem) {
      const system = await prisma.cCTV_System.findUnique({
        where: { id: user.UserSystem.systemId },
      });
      return { ...user, system: system };
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

module.exports = { registerUser, getUser, registerMobileDevice };
