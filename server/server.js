import express from "express";
import cors from "cors";
import "dotenv/config";
import coffeeRoute from "./src/routes/coffeeRout.js";
import dessertRout from "./src/routes/dessertRout.js";
import userRoute from "./src/routes/authRoutes.js";
import searchRoute from "./src/routes/AllSearchRoute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import cookieParser from "cookie-parser"; // Changed to import

/// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// allow front-end connect with baceked because they are use different port
app.use(cors());

// initializing routes

app.use("/api/coffee", coffeeRoute);
app.use("/api/dessert", dessertRout);
app.use("/api/auth", userRoute);
app.use("/api/", searchRoute);

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(port, () => console.log(`Server is start on ${port}`));
