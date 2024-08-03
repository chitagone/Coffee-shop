import express from "express";
import cors from "cors";
import "dotenv/config";
import coffeeRoute from "./src/routes/coffeeRout.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";

/// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());

// allow front-end connect with baceked because they are use different port
app.use(cors());

// initializing routes

app.use("/api/coffee", coffeeRoute);

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(port, () => console.log(`Server is start on ${port}`));
