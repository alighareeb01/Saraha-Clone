import mongoose, { mongo } from "mongoose";

const messageSchema = new mongoose.Schema({
  recieverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
  },
});

export const messageModel = mongoose.model("messages", messageSchema);
