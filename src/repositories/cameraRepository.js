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

async function getCameras(systemId) {
  try {
    const cameras = await prisma.camera_Details.findMany({
      where: { systemId: systemId },
    });
    return cameras;
  } catch (error) {
    throw error;
  }
}

async function changeCameraStatus(data) {
  try {
    const camera = await prisma.camera_Details.update({
      data: { status: data.status },
      where: { id: data.id },
    });
    return camera;
  } catch (error) {
    throw error;
  }
}

async function updateManyCameras(systemId, newStatus) {
  try {
    const result = await prisma.camera_Details.updateMany({
      where: { systemId },
      data: { status: newStatus },
    });
    return result;
  } catch (error) {
    throw error;
  }
}

async function deleteCamera(cameraId) {
  try {
    const result = await prisma.camera_Details.delete({
      where: { id: cameraId },
    });
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addCamera,
  getCameras,
  changeCameraStatus,
  deleteCamera,
  updateManyCameras,
};
