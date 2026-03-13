import Joi from "joi";

export const signUpSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{4,}$/) // at least 4 chars, letters + numbers
    .required(),
  confrimPassword: Joi.string().valid(Joi.ref("password")).required(),

  userName: Joi.string().min(3).max(20).required(),

  role: Joi.string().valid("user", "admin").default("user"),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});
