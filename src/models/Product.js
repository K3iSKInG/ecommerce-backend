const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  category: {
    type: String,
    enum: ["phone", "laptop", "earphone", "camera"],
  },
  brand: String,
  price: Number,
  images: [String],
  description: String,
  stock: Number,
});

module.exports = mongoose.model("Product", ProductSchema);
