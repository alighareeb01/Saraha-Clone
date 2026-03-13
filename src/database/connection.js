import mongoose from "mongoose";

export const databaseConnection = () => {
  mongoose
    .connect(
      "mongodb+srv://aly_ghareeb:aly_ghareeb@cluster0.tjhnevr.mongodb.net/Saraha-Clone",
    )
    .then(() => {
      console.log("data base connected successfully");
    })
    .catch((err) => {
      console.error(err);
    });
};
