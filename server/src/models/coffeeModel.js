import mongoose from "mongoose";

const coffeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
});

const coffeeModel =
  mongoose.models.coffee || mongoose.model("coffee", coffeeSchema);

export default coffeeModel;
