import mongoose from "mongoose";

export const databaseConnection = () => {
  mongoose
    .connect("mongodb://localhost:27017/Saraha-clone")
    .then(() => {
      console.log("data base connected successfully");
    })
    .catch((err) => {
      console.error(err);
    });
};
