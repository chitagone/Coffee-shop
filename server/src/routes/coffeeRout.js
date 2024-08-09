import express from "express";
import {
  addCoffee,
  listCoffee,
  removeCoffee,
  editCoffee,
} from "../controllers/coffeeController.js";
import upload from "../middleware/multer.js";

const coffeeRoute = express.Router();

// create API for add song
coffeeRoute.post(
  "/add",
  upload.fields([{ name: "image", maxCount: 1 }]),
  addCoffee
);

// create API for list song
coffeeRoute.get("/list", listCoffee);

coffeeRoute.post("/remove", removeCoffee);

// Edit coffee route
coffeeRoute.put(
  "/edit/:coffeeId",
  upload.fields([{ name: "image", maxCount: 1 }]),
  editCoffee
);

// export the songRoute
export default coffeeRoute;
