const mongoose = require("mongoose");

// One-to-One: Hotel embeds a Manager as a sub-document
const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hotel name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    starRating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },
    // ONE-TO-ONE: Each hotel has exactly one manager (embedded document)
    manager: {
      name: { type: String, trim: true },
      email: { type: String, trim: true, lowercase: true },
      phone: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
