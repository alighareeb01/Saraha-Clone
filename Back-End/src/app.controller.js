import express from "express";
import morgan from "morgan";
import authRouter from "./modules/authentication/authentication.controller.js";
import userRouter from "./modules/user/user.controller.js";
import messageRouter from "./modules/message/message.controller.js";
import { databaseConnection } from "./database/connection.js";
import { userModel } from "./database/model/user.model.js";
import cors from "cors";
import { sendEmail } from "./common/email/sendEmail.js";
import dotenv from "dotenv";
dotenv.config({ path: "config/.env" });

console.log(process.env.PORT);
console.log(process.env.PORT);

export const bootstrap = () => {
  const app = express();
  app.use(express.json());
  app.get("/", async (req, res) => {
    let d = await userModel.find();
    res.json(d);
  });

  databaseConnection();

  app.use(morgan("dev"));
  app.use("/authentication", authRouter);
  app.use("/user", userRouter);
  app.use("/message", messageRouter);
  app.use(express.urlencoded({ extended: true }));
  app.use("/uploads", express.static("uploads"));
  app.use(cors({ origin: "*" }));
  // sendEmail("3f3fc28d72@emailax.pro", "try", "asdasd");
  app.listen(3000, () => {
    console.log("rii");
  });

  return app;
};;
