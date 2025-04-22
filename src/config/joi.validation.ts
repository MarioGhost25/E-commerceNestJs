import * as Joi from 'joi';
import { join } from 'path';

export const joiValidationSchema = Joi.object({
    DB_PORT: Joi.number().default(2002),
    DB_NAME: Joi.required(),
    DB_HOST: Joi.required(),
    DB_PASSWORD: Joi.required(),
    DB_USERNAME: Joi.required(),
    JWT_SECRET: Joi.string().required(),
})