import express from "express";

import {
  forgetPassword,
  generateAccessToken,
  resendOtp,
  resetPassword,
  userLogin,
  userRegister,
  verifyAcc,
} from "./authentication.service.js";
import { auth } from "../../common/middleware/auth.js";
import { validation } from "../../common/utils/validation.js";
import { loginSchema, signUpSchema } from "./authentication.validation.js";
import { upload } from "../../common/middleware/multer.js";

const router = express.Router();

router.post(
  "/register",
  validation(signUpSchema),

  userRegister,
);
//   "/register",
//   validation(signUpSchema),
//   upload().single("image"),
//   userRegister,
// );
router.post("/login", validation(loginSchema), userLogin);
router.get("/token", auth, generateAccessToken);
router.get("/verify", verifyAcc);
router.put("/resend-otp", resendOtp);
router.put("/forget-password", forgetPassword);
router.put("/reset-password", resetPassword);

export default router;
