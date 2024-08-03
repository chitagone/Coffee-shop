import mongoose from "mongoose";

const dessertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
});

const dessertModel =
  mongoose.models.dessert || mongoose.model("dessert", dessertSchema);

export default dessertModel;
