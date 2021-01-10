import Joi from 'joi';

export const validateInfomation = Joi.object({
  email: Joi.string().email(),
  name: Joi.string(),
  point: Joi.string(),
  id: Joi.allow(),
  isBlocked: Joi.allow(),
});

export const validateVerify = {
  body: Joi.object({
    user: Joi.object().required(),
    tokens: Joi.object().required(),
  }),
};

export const validateDecodeKey = {
  query: Joi.object({
    decodekey: Joi.string().required(),
  }),
};
