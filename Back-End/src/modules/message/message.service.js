import { messageModel } from "../../database/model/message.model.js";
import { userModel } from "../../database/model/user.model.js";

export const sendMessage = async (req, res) => {
  let { recieverId, content } = req.body;
  let userExist = await userModel.findById(recieverId);
  if (!userExist) return res.json("user not found");

  let images;
  console.log(req);

  if (req.files) {
    images = req.files.map((file) => {
      return `http://localhost:8000/uploads/${file.originalname}`;
    });
  }
  let addedMessaged = await messageModel.create({
    recieverId,
    content,
    image: images,
  });

  if (!addedMessaged) return res.json({ Message: "sth went wrong" });

  res.json({ Message: "added", addedMessaged });
};

export const getAllMessages = async (req, res) => {
  let messages = await messageModel.find({ recieverId: req.user });
  if (!messages) return res.json("no messages");
  res.json({ Message: messages });
};

export const getMessageById = async (req, res) => {
  let { id } = req.params;
  let messageData = await messageModel.findOne({
    _id: id,
    recieverId: req.user,
  });
  if (!messageData) return res.json("no messages found");
  res.json({ Message: messageData });
};

export const deleteMessage = async (req, res) => {
  let { id } = req.params;
  let delMessage = await messageModel.findOneAndDelete({
    _id: id,
    recieverId: req.user,
  });
  if (!delMessage) return res.json("not found");
  res.json("deleted succ");
};
