const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function addCamera(data) {
  try {
    const camera = await prisma.camera_Details.create({ data: data });
    return camera;
  } catch (error) {
    throw error;
  }
}

module.exports = { addCamera };
