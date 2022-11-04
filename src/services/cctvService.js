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

module.exports = {
  addCCTVSystem,
  changeCCTVSettings,
  getCCTVSystem,
  validateSystem,
};
