import express from "express";
import {
  addCoffee,
  listCoffee,
  removeCoffee,
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

// export the songRoute
export default coffeeRoute;
