const Guest = require("../models/Guest");

// @desc    Register a new guest
// @route   POST /api/guests
const createGuest = async (req, res) => {
  try {
    const guest = await Guest.create(req.body);
    res.status(201).json({
      success: true,
      message: "Guest registered successfully",
      data: guest,
    });
  } catch (err) {
    // Handle duplicate email
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A guest with this email already exists",
      });
    }
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get all guests
// @route   GET /api/guests
const getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: guests.length,
      data: guests,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get a single guest by ID
// @route   GET /api/guests/:id
const getGuestById = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest)
      return res.status(404).json({ success: false, message: "Guest not found" });
    res.status(200).json({ success: true, data: guest });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Update guest details
// @route   PUT /api/guests/:id
const updateGuest = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!guest)
      return res.status(404).json({ success: false, message: "Guest not found" });
    res.status(200).json({
      success: true,
      message: "Guest updated successfully",
      data: guest,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete a guest by ID
// @route   DELETE /api/guests/:id
const deleteGuest = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndDelete(req.params.id);
    if (!guest)
      return res.status(404).json({ success: false, message: "Guest not found" });
    res.status(200).json({
      success: true,
      message: "Guest deleted successfully",
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Drop all guests
// @route   DELETE /api/guests/drop
const dropGuests = async (req, res) => {
  try {
    const result = await Guest.deleteMany({});
    res.status(200).json({
      success: true,
      message: `All guests dropped. ${result.deletedCount} record(s) removed.`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createGuest,
  getAllGuests,
  getGuestById,
  updateGuest,
  deleteGuest,
  dropGuests,
};
