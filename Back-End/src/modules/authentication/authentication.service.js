import jwt from "jsonwebtoken";
import { userModel } from "./../../database/model/user.model.js";
import bcrypt, { hash } from "bcrypt";

export const userRegister = async (req, res) => {
  let { name, email, password, userName, confrimPassword, role } = req.body;
  // console.log(req.body);
  let emailExist = await userModel.findOne({ email });
  if (emailExist)
    return res.status(409).json({ Message: "Email already exist" });
  let userNameExist = await userModel.findOne({ userName });
  if (userNameExist)
    return res.status(409).json({ Message: "userName already exist" });
  if (password != confrimPassword)
    return res.status(400).json({ Message: "password doesnt match" });

  // let image;
  // if (req.file) {
  //   image = `http://localhost:8000/uploads/${req.file.originalname}`;
  // }

  let hashed = await bcrypt.hash(password, 10);

  let addedUser = await userModel.create({
    name,
    email,
    userName,
    role,
    password: hashed,
    // image,
  });
  if (!addedUser)
    return res.status(500).json({ Message: "something went wrong" });
  res.json({ Message: "user added successfully", addedUser });
};

export const userLogin = async (req, res) => {
  let { email, password } = req.body;

  let userExist = await userModel.findOne({ email });

  if (!userExist) return res.json({ Message: "user not found" });

  let matchedPassword = await bcrypt.compare(password, userExist.password);
  if (!matchedPassword) return res.json({ message: "incoorect password" });

  let signature = "";
  switch (userExist.role) {
    case "admin":
      signature = "admin";
      break;
    case "user":
      signature = "user";
      break;
    default:
      break;
  }

  let accessToken = jwt.sign({ _id: userExist._id }, signature, {
    expiresIn: "30m",
  });
  let refreshToken = jwt.sign({ _id: userExist._id }, signature, {
    expiresIn: "1y",
  });

  res.json({
    Message: "user info",
    user: userExist,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
};

export const generateAccessToken = async (req, res) => {
  //   console.log(req.user);
  let id = req.user;
  console.log(id);
  let user = await userModel.findById(id);
  let signature = "";
  switch (user.role) {
    case "admin":
      signature = "admin";
      break;
    case "user":
      signature = "user";
      break;
    default:
      break;
  }

  let accessToken = jwt.sign({ _id: user._id }, signature, {
    expiresIn: "7d",
  });
  res.json({ accessToken: accessToken });
};
