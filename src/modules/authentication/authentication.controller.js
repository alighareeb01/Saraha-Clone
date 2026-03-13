import express from "express";

import {
  generateAccessToken,
  userLogin,
  userRegister,
} from "./authentication.service.js";
import { auth } from "../../common/middleware/auth.js";
import { validation } from "../../common/utils/validation.js";
import { loginSchema, signUpSchema } from "./authentication.validation.js";
import { upload } from "../../common/middleware/multer.js";

const router = express.Router();

router.post(
  "/register",
  validation(signUpSchema),
  upload().single("image"),
  userRegister,
);
router.post("/login", validation(loginSchema), userLogin);
router.get("/token", auth, generateAccessToken);

export default router;
