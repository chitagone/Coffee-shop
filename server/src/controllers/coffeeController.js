import { v2 as cloudinary } from "cloudinary";
import coffeeModel from "../models/coffeeModel.js";

// create add Coffee
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

// show coffee API
const listCoffee = async (req, res) => {
  try {
    const allCoffee = await coffeeModel.find({});
    res.json({
      success: true,
      coffee: allCoffee,
    });
  } catch (error) {
    res.json({
      success: false,
    });
  }
};
// remove API
const removeCoffee = async (req, res) => {
  try {
    await coffeeModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Coffee has been remove" });
  } catch (error) {
    res.json({
      success: false,
    });
  }
};

// Edit API
const editCoffee = async (req, res) => {
  try {
    const coffeeId = req.params.coffeeId.trim();
    const { name, desc, price } = req.body;
    let imageUpload;

    if (req.files?.image?.[0]) {
      const imageFile = req.files.image[0];
      imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
    }

    const updatedCoffee = await coffeeModel.findByIdAndUpdate(
      coffeeId,
      {
        name,
        desc,
        price,
        ...(imageUpload && { image: imageUpload.secure_url }),
      },
      { new: true }
    );

    if (!updatedCoffee) {
      return res
        .status(404)
        .json({ success: false, message: "Coffee not found" });
    }
    await updatedCoffee.save();
    res.json({
      success: true,
      message: "Coffee updated",
      coffee: updatedCoffee,
    });
  } catch (error) {
    console.error("Error updating coffee:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the coffee",
    });
  }
};
const searchCoffee = async (req, res) => {
  try {
    const { query, priceMin, priceMax } = req.query;

    // Create a regex for case-insensitive search
    const regex = query ? new RegExp(query, "i") : null;

    // Build search conditions
    const searchConditions = {};

    if (regex) {
      searchConditions.$or = [
        { name: { $regex: regex } },
        { desc: { $regex: regex } },
      ];
    }

    if (priceMin !== undefined || priceMax !== undefined) {
      searchConditions.price = {};
      if (priceMin !== undefined) {
        searchConditions.price.$gte = parseFloat(priceMin);
      }
      if (priceMax !== undefined) {
        searchConditions.price.$lte = parseFloat(priceMax);
      }
    }

    // Find coffee entries matching the conditions
    const matchingCoffee = await coffeeModel.find(searchConditions);

    res.json({
      success: true,
      coffee: matchingCoffee,
    });
  } catch (error) {
    console.error("Error searching coffee:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while searching for coffee",
    });
  }
};
export { addCoffee, listCoffee, removeCoffee, editCoffee, searchCoffee };
