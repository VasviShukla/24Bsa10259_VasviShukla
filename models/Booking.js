const mongoose = require("mongoose");

// MANY-TO-MANY: Bookings is the junction between Guests and Rooms
// One Guest can book Many Rooms over time
// One Room can be booked by Many Guests over time
const bookingSchema = new mongoose.Schema(
  {
    // MANY-TO-MANY side 1: reference to Guest
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
      required: [true, "Guest reference is required"],
    },
    // MANY-TO-MANY side 2: reference to Room
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: [true, "Room reference is required"],
    },
    checkIn: {
      type: Date,
      required: [true, "Check-in date is required"],
    },
    checkOut: {
      type: Date,
      required: [true, "Check-out date is required"],
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Confirmed", "Cancelled", "Completed", "Pending"],
      default: "Confirmed",
    },
    specialRequests: {
      type: String,
      trim: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid", "Refunded"],
      default: "Unpaid",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
