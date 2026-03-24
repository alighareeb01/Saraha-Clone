import { userModel } from "./../../database/model/user.model.js";
import bcrypt from "bcrypt";
export const getUserProfile = async (req, res) => {
  let id = req.user;
  let userFound = await userModel.findById(id).select("-password -__v");
  if (!userFound) return res.status(404).json({ Message: "user not found" });
  res.status(200).json({ user: userFound });
};

export const updateUser = async (req, res) => {
  let { name, oldPassword, password, userName } = req.body;
  let id = req.user;

  let updatedObj = {};
  name ? (updatedObj.name = name) : null;

if (userName) {
  let exist = await userModel.findOne({ userName });

  if (exist && exist._id.toString() !== id.toString()) {
    return res.status(409).json({ message: "userName already exist" });
  }

  updatedObj.userName = userName;
}

  if (password) {
    let userData = await userModel.findById(id);
    if (!userData) return res.status(404).json({ message: "User not found" });
    let matched = await bcrypt.compare(oldPassword, userData.password);
    if (!matched)
      return res.status(401).json({ message: "Old password is incorrect" });

    let hashed = await bcrypt.hash(password, 10);
    updatedObj.password = hashed;
  }

  let upadted = await userModel.findByIdAndUpdate(id, updatedObj, {
    new: true,
  });
  if (!upadted)
    return res.status(500).json({ message: "Something went wrong" });

  res.status(200).json({ message: "Updated successfully", upadted });
};

export const deleteUser = async (req, res) => {
  let userFound = await userModel.findByIdAndDelete(req.user);
  if (!userFound) return res.status(404).json({ Message: "user not found" });
  res.status(200).json({ Message: "deleted successfully" });
};

export const generateURL = async (req, res) => {
  let user = await userModel.findById(req.user);

  if (!user) return res.json({ message: "user not found" });

  let profileURL = `http://localhost:3000/user/${user.userName}`;
  res.json({ profileURL: profileURL });
};

export const getDataFromUrl = async (req, res) => {
  let { url } = req.body;

  let data = url.split("/")[4];
  let user = await userModel
    .findOne({ userName: data })
    .select("-password -__v -role");
  if (!user) return res.status(404).json("user not found");
  res.status(200).json({ Message: "user found", user });
};
