import mongoose from "mongoose";

export const connectDB = function () {
  mongoose.connect(process.env.DB, { useNewUrlParser: true });
  mongoose.connection.on("connected", () => {
    console.log("mongoose able to connect to DB");
  });
  mongoose.connection.on("error", (err) => {
    console.log("mongoose unable to connect to DB", err);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("mongoose disconnected to DB");
  });
};
