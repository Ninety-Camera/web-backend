const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function addIntrusion(data) {
  try {
    const intrusion = await prisma.intrusion.create({ data: { ...data } });
    return intrusion;
  } catch (error) {
    throw new Error("Database Error");
  }
}

async function getIntrusions(systemId) {
  try {
    const intrusions = await prisma.intrusion.findMany({
      where: { systemId: systemId },
      include: { Intrusion_Image: true },
    });
    return intrusions;
  } catch (error) {
    throw error;
  }
}

async function addIntrusionImage(data) {
  try {
    const response = await prisma.intrusion_Image.create({ data: data });
    return response;
  } catch (error) {
    throw error;
  }
}

async function addIntrusionVideo(data) {
  try {
    const response = await prisma.intrusion_Video.create({ data: data });
    return response;
  } catch (error) {
    throw error;
  }
}

async function getIntrusionImages(intrusionId) {
  try {
    const response = await prisma.intrusion_Image.findMany({
      where: { intrusionId: intrusionId },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addIntrusion,
  getIntrusions,
  addIntrusionImage,
  addIntrusionVideo,
  getIntrusionImages,
};
