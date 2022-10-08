const createOutput = require("../helpers/createOutput");
const cctvRepository = require("../repositories/cctvRepository");

async function getCCTVSystem(systemId) {
  try {
    const system = await cctvRepository.getCCTVSystem(systemId);
    return system;
  } catch (error) {
    throw error;
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

module.exports = { addCCTVSystem, changeCCTVSettings, getCCTVSystem };
