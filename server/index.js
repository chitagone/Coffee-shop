const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

const uri =
  "mongodb+srv://chittagone:E1hes21WViJYbxvg@cluster0.ad8andt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// database conncetion
mongoose
  .connect(uri)
  .then(() => console.log("database connected"))
  .catch((err) => console.log("connot connect database", err));

// middle ware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extends: false }));

app.use("/", require("./routes/authRoutes"));

const port = 8000;

app.listen(port, () => console.log(`server is runing on port ${port}`));
