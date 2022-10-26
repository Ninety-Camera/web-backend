const createOutput = require("../helpers/createOutput");
const intrusionRepository = require("../repositories/intrusionRepository");

async function addIntrusion(data) {
  try {
    const response = await intrusionRepository.addIntrusion(data);
    return createOutput(201, response);
  } catch (error) {
    return createOutput(500, "Error in adding the instrusion");
  }
}

module.exports = { addIntrusion };
