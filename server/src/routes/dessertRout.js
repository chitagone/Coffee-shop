import express from "express";

import {
  addDessert,
  removeDessert,
  listDessert,
  editDessert,
} from "../controllers/dessertController.js";

import upload from "../middleware/multer.js";

const dessertRout = express.Router();

dessertRout.post(
  "/add",
  upload.fields([{ name: "image", maxCount: 1 }]),
  addDessert
);

// get all dessert
dessertRout.get("/list", listDessert);

// delete API
dessertRout.post("/remove", removeDessert);

dessertRout.put(
  "/edit/:dessertId",
  upload.fields([{ name: "image", maxCount: 1 }]),
  editDessert
);

// export the songRoute
export default dessertRout;
