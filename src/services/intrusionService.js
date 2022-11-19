const createOutput = require("../helpers/createOutput");
const intrusionRepository = require("../repositories/intrusionRepository");
const notificationService = require("./notificationService");
const deviceRepository = require("../repositories/deviceRepository");
const {
  intrusionValidationSchema,
  intrusionImageValidationSchema,
  intrusionVideoValidationSchema,
} = require("../validationSchemas/intrusionSchema");

async function addIntrusion(data) {
  try {
    await intrusionValidationSchema.validateAsync({ ...data });
  } catch (error) {
    return createOutput(401, "Validation error!");
  }
  try {
    const response = await intrusionRepository.addIntrusion(data);
    const deviceResult = await deviceRepository.getMobileDevices(data.systemId);
    const devices = deviceResult.map((item) => item.id);
    const notificationResult = await notificationService.sendNotifications(
      devices
    );

    return createOutput(201, {
      intrusion: response,
      notification: notificationResult,
    });
  } catch (error) {
    return createOutput(500, "Error in adding the instrusion");
  }
}

async function addIntrusionImages(data) {
  try {
    await intrusionImageValidationSchema.validateAsync({ ...data });
  } catch (error) {
    return createOutput(401, "Validation error");
  }
  try {
    const imageData = [];
    data.images.forEach((element) => {
      imageData.push({ intrusionId: data.intrusionId, image: element });
    });
    const response = await intrusionRepository.addIntrusionImages(imageData);
    return createOutput(201, { images: data.images, result: response });
  } catch (error) {
    return createOutput(500, "Error in adding the intrusion Image");
  }
}

async function addIntrusionVideo(data) {
  try {
    await intrusionVideoValidationSchema.validateAsync(data);
  } catch (error) {
    return createOutput(401, "Validation error");
  }

  try {
    const response = await intrusionRepository.addIntrusionVideo(data);
    return createOutput(201, { video: response });
  } catch (error) {
    return createOutput(500, "Error in adding the intrusion video");
  }
}

async function getIntrusions(systemId) {
  try {
    const response = await intrusionRepository.getIntrusions(systemId);
    return createOutput(200, response);
  } catch (error) {
    return createOutput(500, "Error occured in getting the intrusions");
  }
}

async function getIntrusionImages(systemId) {
  try {
    const response = await intrusionRepository.getIntrusionImages(systemId);
    return createOutput(200, { images: response });
  } catch (error) {
    return createOutput(500, "Error occured while getting the images");
  }
}

async function getLatestIntrusion(systemId) {
  try {
    const response = await intrusionRepository.getLatestIntrusion(systemId);
    return createOutput(200, { intrusion: response });
  } catch (error) {
    return createOutput(500, "Error occured in getting the intrusion");
  }
}

async function getTotalIntrusions() {
  try {
    const response = await intrusionRepository.getTotalIntrusions();
    return createOutput(200, response);
  } catch (error) {
    return createOutput(500, "Error occured in getting the intrusions");
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
