import Joi from "joi";

const memberValidationSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().allow('').optional(),
    emails: Joi.array().items(Joi.string().email()).min(1).required(),
    appliedBy: Joi.string().required(),
    imageUrls: Joi.array().items(Joi.string().uri()).allow('').optional(),
    phoneNumbers: Joi.array().items(Joi.string()).allow('').optional(),
    facebookLink: Joi.string().uri().allow('').optional(),
    linkedinLink: Joi.string().uri().allow('').optional(),
    state: Joi.string().allow('').optional(),
    city: Joi.string().allow('').optional(),
    dateOfBirth: Joi.date().allow('').optional(),
    rollNo: Joi.string().allow('').optional(),
    teams: Joi.array()
        .items(
            Joi.object({
                position: Joi.string().required(),
                team: Joi.string().required(),
                year: Joi.number().required(),
            })
        )
        .allow('')
        .optional(),
});

export default memberValidationSchema;
