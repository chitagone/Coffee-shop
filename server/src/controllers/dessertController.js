import { v2 as cloudinary } from "cloudinary";
import dessertModel from "../models/dessertModel.js";

const addDessert = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const price = req.body.price;
    const imageFile = req.files.image[0];

    // upload image to coludinary storage
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const dessertData = {
      name,
      desc,
      price,
      image: imageUpload.secure_url,
    };
    const coffee = dessertModel(dessertData);
    await coffee.save();
    res.json({ success: true, message: "Dessert Added" });
  } catch (error) {
    res.json({
      success: false,
    });
    console.log(error);
  }
};

const listDessert = async (req, res) => {
  try {
    const allDessert = await dessertModel.find({});
    res.json({
      success: true,
      dessert: allDessert,
    });
  } catch (error) {
    res.json({
      success: false,
    });
  }
};

const removeDessert = async (req, res) => {
  try {
    await dessertModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Dessert has been remove" });
  } catch (error) {
    res.json({
      success: false,
    });
  }
};

export { addDessert, listDessert, removeDessert };
