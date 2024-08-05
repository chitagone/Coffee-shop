import express from "express";

import {
  addDessert,
  removeDessert,
  listDessert,
} from "../controllers/dessertController.js";

import upload from "../middleware/multer.js";

const dessertRout = express.Router();

dessertRout.post(
  "/add",
  upload.fields([{ name: "image", maxCount: 1 }]),
  addDessert
);

// create API for list song
dessertRout.get("/list", listDessert);

dessertRout.post("/remove", removeDessert);

// export the songRoute
export default dessertRout;
