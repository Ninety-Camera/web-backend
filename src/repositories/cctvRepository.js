const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getCCTVSystem(systemId) {
  try {
    const system = await prisma.cCTV_System.findUnique({
      where: { id: systemId },
    });
    return system;
  } catch (error) {
    throw error;
  }
}

async function addCCTVSystem(data) {
  try {
    const userUpdate = prisma.user.update({
      where: { id: data.userId },
      data: { role: "OWNER" },
    });
    const createSystem = prisma.cCTV_System.create({
      data: {
        cameraCount: data.cameraCount,
        ownerId: data.userId,
      },
    });
    const [system, user] = await prisma.$transaction([
      createSystem,
      userUpdate,
    ]);
    return system;
  } catch (error) {
    throw error;
  }
}

async function updateCameraCount(systemId, factor) {
  try {
    const cameraCount = await prisma.cCTV_System.findUnique({
      where: {
        id: systemId,
      },
      select: {
        cameraCount: true,
      },
    });

    const response = await prisma.cCTV_System.update({
      where: {
        id: systemId,
      },
      data: {
        cameraCount: cameraCount.cameraCount + factor,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function changeCCTVSettings(data) {
  try {
    const result = await prisma.cCTV_System.update({
      where: { id: data.systemId },
      data: { status: data.newStatus },
    });
    return result;
  } catch (error) {
    throw error;
  }
}

async function getSubscribedUsers(systemId) {
  try {
    const result = await prisma.userSystem.findMany({
      where: { systemId: systemId },
      include: {
        user: {
          select: {
            email: true,
            role: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
}

async function deleteSubscribedUser(userId) {
  try {
    const userSystemDelete = prisma.userSystem.delete({
      where: {
        userId: userId,
      },
    });
    const userDeviceDelete = prisma.mobile_Device.delete({
      where: {
        ownerId: userId,
      },
    });
    const [result1, result2] = await prisma.$transaction([
      userSystemDelete,
      userDeviceDelete,
    ]);
    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addCCTVSystem,
  changeCCTVSettings,
  getCCTVSystem,
  getSubscribedUsers,
  deleteSubscribedUser,
  updateCameraCount,
};
