import express from "express";

import {
  test,
  registerUser,
  loginUser,
  listUser,
  removeUser,
} from "../controllers/authController.js";

const userRoute = express.Router();

userRoute.get("/", test);
userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.get("/list", listUser);
userRoute.post("/remove", removeUser);

export default userRoute;
