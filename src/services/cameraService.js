const createOutput = require("../helpers/createOutput");
const cctvRepository = require("../repositories/cameraRepository");
const {
  cameraValidationSchema,
  cameraDetailsUpdateSchema,
} = require("../validationSchemas/cameraSchema");

async function addCamera(data) {
  try {
    await cameraValidationSchema.validateAsync(data);
  } catch (error) {
    return createOutput(400, "Validation error");
  }

  try {
    const response = await cctvRepository.addCamera(data);

    return createOutput(201, { camera: response });
  } catch (error) {
    console.log(error);
    return createOutput(500, "Error in adding the camera ");
  }
}

async function getCameras(systemId) {
  try {
    const cameras = await cctvRepository.getCameras(systemId);
    return createOutput(200, { cameras: cameras });
  } catch (error) {
    return createOutput(500, "Error in getting the camers");
  }
}

async function updateManyCameraStatus(systemId, newStatus) {
  try {
    const result = await cctvRepository.updateManyCameras(systemId, newStatus);
    return createOutput(200, { cameras: result });
  } catch (error) {
    return createOutput(500, "Error in updating the details");
  }
}

async function updateCameraStatus(data) {
  try {
    await cameraDetailsUpdateSchema.validateAsync(data);
  } catch (error) {
    return createOutput(400, "Validation Error");
  }
  try {
    const cameraUpdate = { id: data.id, status: data.status };
    const camera = await cctvRepository.changeCameraStatus(cameraUpdate);
    return createOutput(200, { camera: camera });
  } catch (error) {
    return createOutput(500, "Error in updating the camera");
  }
}

async function deleteCamera(cameraId) {
  try {
    const response = await cctvRepository.deleteCamera(cameraId);
    return createOutput(200, response);
  } catch (error) {
    return createOutput(500, "Error in deleting the camera");
  }
}

module.exports = {
  addCamera,
  getCameras,
  updateCameraStatus,
  deleteCamera,
  updateManyCameraStatus,
};
