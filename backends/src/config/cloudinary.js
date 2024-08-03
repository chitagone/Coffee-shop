import { v2 as cloudinary } from "cloudinary";
import "dotenv/config"; // Ensure dotenv is configured at the top

const connectCloudinary = async () => {
  try {
    await cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });
    console.log("Cloudinary configuration successful");
  } catch (error) {
    console.error("Failed to configure Cloudinary", error);
    throw new Error("Cloudinary configuration error");
  }
};

export default connectCloudinary;
