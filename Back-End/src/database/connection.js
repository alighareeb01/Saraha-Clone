import mongoose from "mongoose";

export const databaseConnection = () => {
  mongoose
    .connect(
      "mongodb+srv://ecommerce_user:Ecommerce123456@cluster0.phn0skp.mongodb.net/saraha-app?retryWrites=true&w=majority",
    )
    .then(() => {
      console.log("data base connected successfully");
    })
    .catch((err) => {
      console.error(err);
    });
};
