
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    serialNumber: {
      type: Number,
      required: [true, "Serial number is required"],
      unique: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },

    category: {
      type: String,
      default: "General",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Main image (kept for compatibility)
    image: {
      type: String,
      default: "",
    },

    // Three product images
    images: {
      type: [String],
      default: [],
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
