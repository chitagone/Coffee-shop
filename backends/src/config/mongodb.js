import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Connected to DB");
  });
  await mongoose.connect(`${process.env.MONGODB_URL}/coffee`);
};

export default connectDB;
