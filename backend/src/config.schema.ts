import * as Joi from 'joi';

export const configSchema = Joi.object({
  STAGE: Joi.string().required(),
  PORT: Joi.number().default(3000),
  MONGODB_DATABASE_URL: Joi.string().required(),
});
