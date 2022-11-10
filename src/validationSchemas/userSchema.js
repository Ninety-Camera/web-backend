const Joi = require("joi");

const userPasswordResetSchema = Joi.object({
  password: Joi.string()
    .regex(/\d+/, "Password should contain at least one number")
    .regex(/[a-z]+/, "Password should contain at least one lowercase character")
    .regex(
      /[A-Z]+/,
      "Passoword should contain at least one uppercase character"
    )
    .regex(
      /[!@#$%^&*()-+]+/,
      "Password should contain at least one special character"
    ),
  userId: Joi.string().required(),
});

const userRegisterSchema = Joi.object({
  firstName: Joi.string().required().min(3).max(255),
  lastName: Joi.string().required().min(3).max(255),
  email: Joi.string().email().max(255).required(),
  password: Joi.string()
    .regex(/\d+/, "Password should contain at least one number")
    .regex(/[a-z]+/, "Password should contain at least one lowercase character")
    .regex(
      /[A-Z]+/,
      "Passoword should contain at least one uppercase character"
    )
    .regex(
      /[!@#$%^&*()-+]+/,
      "Password should contain at least one special character"
    ),
});

const userSignInSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  password: Joi.string()
    .regex(/\d+/, "Password should contain at least one number")
    .regex(/[a-z]+/, "Password should contain at least one lowercase character")
    .regex(
      /[A-Z]+/,
      "Passoword should contain at least one uppercase character"
    )
    .regex(
      /[!@#$%^&*()-+]+/,
      "Password should contain at least one special character"
    ),
});

module.exports = {
  userRegisterSchema,
  userSignInSchema,
  userPasswordResetSchema,
};
