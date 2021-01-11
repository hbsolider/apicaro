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

export const validateForgotPassword = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
};

export const validateRequestRecovery = {
  body: Joi.object({
    password: Joi.string().min(6).required(),
    confirm: Joi.string().min(6).required(),
    secretKey: Joi.string().required(),
  }),
};
