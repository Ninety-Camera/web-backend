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
      include: { Intrusion_Image: true, Intrusion_Video: true },
    });
    return intrusions;
  } catch (error) {
    throw error;
  }
}

async function getLatestIntrusion(systemId) {
  try {
    const intrusion = await prisma.intrusion.findMany({
      orderBy: {
        occuredAt: "desc",
      },
      include: {
        Intrusion_Image: true,
        Intrusion_Video: true,
      },
      where: { systemId: systemId },
    });
    if (intrusion.length >= 1) {
      return intrusion[0];
    }
    return intrusion;
  } catch (error) {
    throw error;
  }
}

async function addIntrusionImages(data) {
  try {
    const response = await prisma.intrusion_Image.createMany({ data: data });
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

async function getTotalIntrusions() {
  try {
    const response = await prisma.intrusion.count();
    return response;
  } catch (error) {
    return error;
  }
}

module.exports = {
  addIntrusion,
  getIntrusions,
  addIntrusionImages,
  addIntrusionVideo,
  getIntrusionImages,
  getLatestIntrusion,
  getTotalIntrusions,
};
