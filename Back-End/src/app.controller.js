import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import morgan from "morgan";
import authRouter from "./modules/authentication/authentication.controller.js";
import userRouter from "./modules/user/user.controller.js";
import messageRouter from "./modules/message/message.controller.js";
import { databaseConnection } from "./database/connection.js";
import { userModel } from "./database/model/user.model.js";
import cors from "cors";

//comment  forVERCEL ss
//comment for vercel refresh
//comment for vercel refresh
//comment for vercel refresh
export const bootstrap = () => {
  const app = express();
  app.use(express.json());
  app.get("/", async (req, res) => {
    let d = await userModel.find();
    res.json(d);
  });

  // console.log("ENV TEST:", {
  //   PORT: process.env.PORT,
  //   EMAIL_USER: process.env.EMAIL_USER,
  //   HAS_PASS: !!process.env.EMAIL_PASS,
  // });
  databaseConnection();
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://saraha-clone-frontend.vercel.app",
      ],
    }),
  );
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use("/authentication", authRouter);
  app.use("/user", userRouter);
  app.use("/message", messageRouter);

  app.use("/uploads", express.static("uploads"));
  // app.use(cors({ origin: "*" }));
  app.listen(process.env.PORT, () => {
    console.log("server running on port 3000");
  });

  return app;
};
