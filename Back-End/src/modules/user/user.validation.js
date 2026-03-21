import Joi from "joi";

export const updateSchema = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  userName: Joi.string().min(3).max(20).optional(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{4,}$/)
    .optional(),
  oldPassword: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{4,}$/)
    .optional(),
});
