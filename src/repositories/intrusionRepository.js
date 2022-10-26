const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function addIntrusion(data) {
  try {
    const intrusion = await prisma.intrusion.create({ data: { ...data } });
    return intrusion;
  } catch (error) {
    throw error;
  }
}

module.exports = { addIntrusion };
