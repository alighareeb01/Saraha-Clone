import express from "express";
import morgan from "morgan";
import { databaseConnection } from "./database/connection.js";
import authRouter from "./modules/authentication/authentication.controller.js";
import userRouter from "./modules/user/user.controller.js";
import messageRouter from "./modules/message/message.controller.js";

export const bootstrap = () => {
  const app = express();

  app.use(express.json());
  app.use(morgan("dev"));
  app.use("/authentication", authRouter);
  app.use("/user", userRouter);
  app.use("/message", messageRouter);
  app.use(express.urlencoded({ extended: true }));
  app.use("/uploads", express.static("uploads"));
  databaseConnection();

  app.listen(8000, () => {
    console.log("server is running on port 8000");
  });
};
