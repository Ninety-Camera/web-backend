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
    const system = await prisma.cCTV_System.create({ data: { ...data } });
    return system;
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

module.exports = { addCCTVSystem, changeCCTVSettings, getCCTVSystem };
