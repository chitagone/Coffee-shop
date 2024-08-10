import { v2 as cloudinary } from "cloudinary";
import dessertModel from "../models/dessertModel.js";

// Add API
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

// Show ALL API
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

// Remove APi
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

const editDessert = async (req, res) => {
  try {
    const dessertId = req.params.dessertId;
    const { name, desc, price } = req.body;
    let imageUpload;

    if (req.files?.image?.[0]) {
      const imageFile = req.files.image[0];
      imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
    }
    const updateDessert = await dessertModel.findByIdAndUpdate(
      dessertId,
      {
        name,
        desc,
        price,
        ...(imageUpload && { image: imageUpload.secure_url }),
      },
      { new: true }
    );

    if (!updateDessert) {
      return res
        .status(404)
        .json({ success: false, message: "Dessert not found" });
    }
    await updateDessert.save();
    res.json({
      success: true,
      message: "Coffee Update",
      dessert: updateDessert,
    });
  } catch (error) {
    console.error("Error updating Dessert:", error);
    res.status(500).json({
      success: false,
      message: "An Error Occurred while updating the desert",
    });
  }
};

export { addDessert, listDessert, removeDessert, editDessert };
