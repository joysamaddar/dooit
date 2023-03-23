import * as Joi from 'joi';

export const configSchema = Joi.object({
  STAGE: Joi.string().required(),
  PORT: Joi.number().default(4000),
  MONGODB_DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
