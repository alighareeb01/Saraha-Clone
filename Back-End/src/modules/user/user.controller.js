import express from "express";
import {
  deleteUser,
  generateURL,
  getDataFromUrl,
  getUserProfile,
  updateUser,
} from "./user.service.js";
import { auth } from "../../common/middleware/auth.js";
import { validation } from "../../common/utils/validation.js";
import { updateSchema } from "./user.validation.js";

const router = express.Router();

router.get("/profile", auth, getUserProfile);
router.put("/update", auth, validation(updateSchema), updateUser);
router.delete("/delete", auth, deleteUser);
router.get("/url", auth, generateURL);
router.get("/data-from-url", getDataFromUrl);

export default router;
