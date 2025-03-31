import * as Joi from 'joi';

export const joiValidationSchema = Joi.object({
    PORT: Joi.number().default(2002),
    POSTGRES_URL: Joi.required(),
    POSTGRES_USER: Joi.required(),
    POSTGRES_PASSWORD: Joi.required(),
    POSTGRES_DB: Joi.required(),
})