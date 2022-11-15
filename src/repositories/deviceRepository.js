const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getMobileDevices(systemId) {
  try {
    const response = await prisma.mobile_Device.findMany({
      where: { systemId: systemId },
    });
    return response;
  } catch (error) {
    throw error;
  }
}



module.exports = { getMobileDevices };
