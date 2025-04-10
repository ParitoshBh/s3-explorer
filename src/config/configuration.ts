import * as Joi from 'joi';

export const validationSchema = Joi.object({
  S3_ENDPOINT: Joi.string().required(),
  S3_ACCESS_KEY_ID: Joi.string().required(),
  S3_SECRET_ACCESS_KEY: Joi.string().required(),
  S3_REGION: Joi.string().optional().default('us-east-1'),
  S3_PORT: Joi.number().port().optional().default(3000),
});
