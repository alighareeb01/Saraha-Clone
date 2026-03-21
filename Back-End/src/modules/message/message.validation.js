import Joi from "joi";

export const sendMessageSchema = Joi.object({
  recieverId: Joi.string().required(),
  content: Joi.string().required(),
  image: Joi.string().optional(),
});
