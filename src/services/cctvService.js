const createOutput = require("../helpers/createOutput");
const cctvRepository = require("../repositories/cctvRepository");

async function addCCTVSystem(data) {
  try {
    const system = await cctvRepository.addCCTVSystem(data);
    return createOutput(201, system);
  } catch (error) {
    return createOutput(500, "Error in creating the system");
  }
}

module.exports = { addCCTVSystem };
