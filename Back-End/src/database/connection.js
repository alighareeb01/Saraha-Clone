import mongoose from "mongoose";

export const databaseConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("data base connected successfully");
    })
    .catch((err) => {
      console.error(err);
    });
};
