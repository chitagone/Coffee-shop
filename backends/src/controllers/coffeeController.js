import { v2 as cloudinary } from "cloudinary";
import coffeeModel from "../models/coffeeModel.js";

// create add song and list song API
const addCoffee = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const price = req.body.price;
    const imageFile = req.files.image[0];

    // upload image to coludinary storage
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const coffeeData = {
      name,
      desc,
      price,
      image: imageUpload.secure_url,
    };
    const coffee = coffeeModel(coffeeData);
    await coffee.save();
    res.json({ success: true, message: "Coffee Added" });
  } catch (error) {
    res.json({
      success: false,
    });
    console.log(error);
  }
};

const listCoffee = async (req, res) => {};

const removeCoffee = async (req, res) => {};

export { addCoffee, listCoffee };
