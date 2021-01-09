import Joi from 'joi';

export const validateInfomation = Joi.object({
  email: Joi.string().email(),
  name: Joi.string(),
  point: Joi.string(),
  id: Joi.allow(),
  isBlocked: Joi.allow(),
});
