import Joi from "joi";

const teamValidationSchema = Joi.object({
  team: Joi.string().required(),
  position: Joi.string().required(),
  year: Joi.number().required(),
});
