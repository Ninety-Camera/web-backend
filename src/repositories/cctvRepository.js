const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function addCCTVSystem(data) {
  try {
    const system = await prisma.cCTV_System.create({ data: { ...data } });
    return system;
  } catch (error) {
    throw error;
  }
}

module.exports = { addCCTVSystem };
