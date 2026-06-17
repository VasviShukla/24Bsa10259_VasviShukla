const Booking = require("../models/Booking");
const Room = require("../models/Room");

// @desc    Create a booking (auto-marks room as unavailable)
// @route   POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const { guest, room, checkIn, checkOut, specialRequests, paymentStatus } = req.body;

    // Step 1: Check if room exists and is available
    const selectedRoom = await Room.findById(room);
    if (!selectedRoom) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }
    if (!selectedRoom.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Room is not available. Please choose a different room.",
      });
    }

    // Step 2: Calculate total amount
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );
    if (nights <= 0) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date",
      });
    }
    const totalAmount = nights * selectedRoom.price;

    // Step 3: Create the booking
    const booking = await Booking.create({
      guest,
      room,
      checkIn,
      checkOut,
      totalAmount,
      specialRequests,
      paymentStatus,
    });

    // Step 4: Mark room as unavailable (business logic)
    await Room.findByIdAndUpdate(room, { isAvailable: false });

    // Step 5: Return populated response
    const populated = await Booking.findById(booking._id)
      .populate("guest", "name email phone")
      .populate({
        path: "room",
        select: "roomNumber type price floor",
        populate: { path: "hotel", select: "name location" },
      });

    res.status(201).json({
      success: true,
      message: `Booking confirmed! Total amount: ₹${totalAmount} for ${nights} night(s).`,
      data: populated,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get all bookings (fully populated)
// @route   GET /api/bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("guest", "name email phone nationality")
      .populate({
        path: "room",
        select: "roomNumber type price floor isAvailable",
        populate: { path: "hotel", select: "name location starRating" },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get a single booking by ID
// @route   GET /api/bookings/:id
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("guest", "name email phone address")
      .populate({
        path: "room",
        populate: { path: "hotel", select: "name location phone" },
      });

    if (!booking)
      return res.status(404).json({ success: false, message: "Booking not found" });

    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Cancel a booking (auto-marks room as available again)
// @route   PUT /api/bookings/:id/cancel
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking)
      return res.status(404).json({ success: false, message: "Booking not found" });

    if (booking.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    // Update booking status
    booking.status = "Cancelled";
    booking.paymentStatus = "Refunded";
    await booking.save();

    // Free up the room (business logic)
    await Room.findByIdAndUpdate(booking.room, { isAvailable: true });

    res.status(200).json({
      success: true,
      message: "Booking cancelled and room is now available again",
      data: booking,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Update booking details
// @route   PUT /api/bookings/:id
const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("guest", "name email")
      .populate({ path: "room", populate: { path: "hotel", select: "name" } });

    if (!booking)
      return res.status(404).json({ success: false, message: "Booking not found" });

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete a booking by ID
// @route   DELETE /api/bookings/:id
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking)
      return res.status(404).json({ success: false, message: "Booking not found" });

    // Free up the room when booking is deleted
    await Room.findByIdAndUpdate(booking.room, { isAvailable: true });

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Drop all bookings
// @route   DELETE /api/bookings/drop
const dropBookings = async (req, res) => {
  try {
    const result = await Booking.deleteMany({});
    // Reset all rooms to available
    await Room.updateMany({}, { isAvailable: true });

    res.status(200).json({
      success: true,
      message: `All bookings dropped. ${result.deletedCount} record(s) removed. All rooms reset to available.`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  cancelBooking,
  updateBooking,
  deleteBooking,
  dropBookings,
};
