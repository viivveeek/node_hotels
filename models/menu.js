const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    taste: {
      type: String,
      enum: ["sweeter", "bitter", "spicy"],
    },
    is_drink: {
      type: Boolean,
      default: false,
    },
    ingredients: {
      type: [String],
    },
    num_sales: {
      type: Number,
      default: 0,
    },
  },
  { collection: "menu" }
);

module.exports = mongoose.model("menu", menuSchema);
