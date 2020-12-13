const Joi = require('joi');

const registerValidate = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6).max(128),
  name: Joi.required(),
});
const loginValidate = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6).max(128),
});
module.exports = {
  registerValidate,
  loginValidate
};
