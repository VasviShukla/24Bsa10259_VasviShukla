const mongoose = require("mongoose");

// MANY-TO-ONE: Many Rooms belong to One Hotel
const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, "Room number is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["Single", "Double", "Suite", "Deluxe"],
      required: [true, "Room type is required"],
    },
    price: {
      type: Number,
      required: [true, "Price per night is required"],
      min: 0,
    },
    floor: {
      type: Number,
      default: 1,
    },
    maxOccupancy: {
      type: Number,
      default: 2,
    },
    amenities: {
      type: [String],
      default: [],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    // MANY-TO-ONE: Each Room references One Hotel
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: [true, "Hotel reference is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
