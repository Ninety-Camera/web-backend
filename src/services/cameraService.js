const createOutput = require("../helpers/createOutput");
const cctvRepository = require("../repositories/cameraRepository");
const { cameraValidationSchema } = require("../validationSchemas/cameraSchema");

async function addCamera(data) {
  try {
    await cameraValidationSchema.validateAsync(data);
  } catch (error) {
    return createOutput(400, "Validation error");
  }

  try {
    console.log("Data: ", data);
    const response = await cctvRepository.addCamera(data);
    return createOutput(201, { camera: response });
  } catch (error) {
    console.log(error);
    return createOutput(500, "Error in adding the camera ");
  }
}

module.exports = { addCamera };
