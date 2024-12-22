import Joi from 'joi';

const memberValidationSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().optional(),
    emails: Joi.array().items(Joi.string().email()).required(),
    imageUrls: Joi.array().items(Joi.string().uri()).optional(),
    phoneNumbers: Joi.array().items(Joi.string()).optional(),
    facebookLink: Joi.string().uri().optional(),
    linkedinLink: Joi.string().uri().optional(),
    state: Joi.string().optional(),
    city: Joi.string().optional(),
    dateOfBirth: Joi.date().optional(),
    rollNo: Joi.string().optional(),
    teams: Joi.array().items(Joi.object({
        position: Joi.string().required(),
        team: Joi.string().required(),
        year: Joi.string().required()
    })).optional()
});

export default memberValidationSchema;
