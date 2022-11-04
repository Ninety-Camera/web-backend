const Joi = require("joi");

const mobileDeviceValidationSchema = Joi.object({
  id: Joi.string().required(),
  systemId: Joi.string().required(),
  ownerId: Joi.string().required(),
});

module.exports = { mobileDeviceValidationSchema };
