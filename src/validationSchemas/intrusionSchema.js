const Joi = require("joi");

const intrusionValidationSchema = Joi.object({
  systemId: Joi.string().required(),
});

const intrusionImageValidationSchema = Joi.object({
  intrusionId: Joi.string().required(),
  images: Joi.array().required(),
});

const intrusionVideoValidationSchema = Joi.object({
  intrusionId: Joi.string().required(),
  video: Joi.string().required(),
});

module.exports = {
  intrusionValidationSchema,
  intrusionImageValidationSchema,
  intrusionVideoValidationSchema,
};
