import { userModel } from "./../../database/model/user.model.js";
import bcrypt from "bcrypt";
export const getUserProfile = async (req, res) => {
  let id = req.user;
  let userFound = await userModel.findById(id).select("-password -__v");
  if (!userFound) return res.json({ Message: "user not found" });
  res.json({ user: userFound });
};

export const updateUser = async (req, res) => {
  let { name, oldPassword, password, userName } = req.body;
  let id = req.user;

  let updatedObj = {};
  name ? (updatedObj.name = name) : null;

  if (userName) {
    let exist = await userModel.findOne({ userName });
    if (exist) return res.json("user name exist ");
    updatedObj.userName = userName;
  }

  if (password) {
    let userData = await userModel.findById(id);
    let matched = await bcrypt.compare(oldPassword, userData.password);
    if (matched) {
      let hashed = await bcrypt.hash(password, 10);
      updatedObj.password = hashed;
    }
  }

  let upadted = await userModel.findByIdAndUpdate(id, updatedObj, {
    returnDocument: true,
  });
  if (!upadted) return res.json({ message: "something went wrong" });
  res.json({ Message: " upadted successfully", upadted });
};

export const deleteUser = async (req, res) => {
  let userFound = await userModel.findByIdAndDelete(req.user);
  if (!userFound) return res.json({ Message: "user not found" });
  res.json({ Message: "deleted successfully" });
};

export const generateURL = async (req, res) => {
  let user = await userModel.findById(req.user);

  if (!user) return res.json({ message: "user not found" });

  let profileURL = `http://localhost:8000/user/${user.userName}`;
  res.json({ profileURL: profileURL });
};

export const getDataFromUrl = async (req, res) => {
  let { url } = req.body;

  let data = url.split("/")[4];
  let user = await userModel
    .findOne({ userName: data })
    .select("-password -__v -role");
  if (!user) return res.json("user not found");
  res.json({ Message: "user found", user });
};
