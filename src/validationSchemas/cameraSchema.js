const Joi = require("joi");

const cameraValidationSchema = Joi.object({
  systemId: Joi.string().required(),
  name: Joi.string().required(),
  status: Joi.string().required(),
  type: Joi.string().required(),
});

const cameraDetailsUpdateSchema = Joi.object({
  id: Joi.string().required(),
  systemId: Joi.string().required(),
  status: Joi.string().required(),
});

module.exports = {
  cameraValidationSchema,
  cameraDetailsUpdateSchema,
};
