import express from "express";
import morgan from "morgan";
import authRouter from "./modules/authentication/authentication.controller.js";
import userRouter from "./modules/user/user.controller.js";
import messageRouter from "./modules/message/message.controller.js";
import { databaseConnection } from "./database/connection.js";

export const bootstrap = () => {
  const app = express();
  app.use(express.json());
  app.get("/", (req, res) => {
    res.send("Saraha API is running 🚀");
  });

  databaseConnection();

  app.use(morgan("dev"));
  app.use("/authentication", authRouter);
  app.use("/user", userRouter);
  app.use("/message", messageRouter);
  app.use(express.urlencoded({ extended: true }));
  app.use("/uploads", express.static("uploads"));

  return app;
};
