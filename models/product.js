const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    photo: String,
    price: Number,
    stockQuantity: Number,
    rating: [Number],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
