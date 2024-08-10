// src/routes/AllSearchRoute.js
import express from "express";
import { searchAllItems } from "../controllers/AllSearch.js";

const searchRoute = express.Router();

searchRoute.get("/search-all-items", searchAllItems);

export default searchRoute;
