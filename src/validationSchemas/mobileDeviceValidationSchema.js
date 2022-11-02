const Joi = require("joi");

const mobileDeviceValidationSchema = Joi.object({
  id: Joi.string().required(),
  systemId: Joi.string().required(),
  userId: Joi.string().required(),
});

module.exports = { mobileDeviceValidationSchema };
