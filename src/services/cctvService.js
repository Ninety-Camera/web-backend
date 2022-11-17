const createOutput = require("../helpers/createOutput");
const cctvRepository = require("../repositories/cctvRepository");

async function validateSystem(systemId) {
  try {
    const system = await cctvRepository.getCCTVSystem(systemId);
    if (system) {
      return createOutput(200, "CCTV system exits");
    } else {
      return createOutput(400, "CCTV system not exists");
    }
  } catch (error) {
    return createOutput(500, "Error occured ");
  }
}

async function getCCTVSystem(systemId) {
  try {
    const system = await cctvRepository.getCCTVSystem(systemId);
    return createOutput(200, system);
  } catch (error) {
    return createOutput(500, "Error occured");
  }
}

async function addCCTVSystem(data) {
  try {
    const system = await cctvRepository.addCCTVSystem(data);
    return createOutput(201, system);
  } catch (error) {
    return createOutput(500, "Error in creating the system");
  }
}

async function updateCCTVSystem(data) {
  try {
    const response = await cctvRepository.updateCameraCount(
      data.systemId,
      data.cameraCount
    );
    return createOutput(201, "Changed succesfully!");
  } catch (error) {
    return createOutput(500, "Error in changing the count");
  }
}

async function changeCCTVSettings(data) {
  try {
    const system = await cctvRepository.getCCTVSystem(data.systemId);
    if (!system) {
      return createOutput(404, "System not found");
    }
    const result = await cctvRepository.changeCCTVSettings(data);
    return createOutput(201, result);
  } catch (error) {
    console.log("Error : ", error);
    return createOutput(500, "Error in updating the status of the system");
  }
}

async function getSubscriberUsers(systemId) {
  try {
    const response = await cctvRepository.getSubscribedUsers(systemId);
    return createOutput(200, { users: [...response] });
  } catch (error) {
    return createOutput(500, "Error in getting the subscribed users");
  }
}

async function deleteSubscribedUser(userId) {
  if (!userId) {
    return createOutput(401, "Validation error");
  }
  try {
    const response = await cctvRepository.deleteSubscribedUser(userId);
    return createOutput(200, "User deleted succesfully!");
  } catch (error) {
    console.log("Error is :", error);
    return createOutput(500, "Error in deleting the user");
  }
}

async function updateCameraCount(systemId, factor) {
  try {
    const response = await cctvRepository.updateCameraCount(systemId, 1);
    console.log("Repsinse is: ", response);
    return createOutput(201, "Camera count updated");
  } catch (error) {
    console.log("Error is: ", error);
    return createOutput(500, "Error in updating the system");
  }
}

module.exports = {
  addCCTVSystem,
  changeCCTVSettings,
  getCCTVSystem,
  validateSystem,
  getSubscriberUsers,
  deleteSubscribedUser,
  updateCCTVSystem,
  updateCameraCount,
};
