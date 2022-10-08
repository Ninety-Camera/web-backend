const Joi = require("joi");

const userRegisterSchema = Joi.object({
  firstName: Joi.string().required().min(3).max(255),
  lastName: Joi.string().required().min(3).max(255),
  email: Joi.string().email().max(255).required(),
  password: Joi.string(),
});

module.exports = { userRegisterSchema };
