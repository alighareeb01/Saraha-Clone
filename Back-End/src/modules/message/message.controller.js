import { Router } from "express";
import { validation } from "../../common/utils/validation.js";
import { sendMessageSchema } from "./message.validation.js";
import {
  deleteMessage,
  getAllMessages,
  getMessageById,
  sendMessage,
} from "./message.service.js";
import { auth } from "../../common/middleware/auth.js";
import { upload } from "../../common/middleware/multer.js";

const router = Router();

router.post(
  "/add",
  validation(sendMessageSchema),
  upload().array("images"),
  sendMessage,
);

router.get("/all", auth, getAllMessages);
router.get("/:id", auth, getMessageById);
router.delete("/delete/:id", auth, deleteMessage);

export default router;
