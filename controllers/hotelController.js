const Hotel = require("../models/Hotel");

// @desc    Create a new hotel
// @route   POST /api/hotels
const createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Hotel created successfully",
      data: hotel,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get all hotels
// @route   GET /api/hotels
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get a single hotel by ID
// @route   GET /api/hotels/:id
const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel)
      return res.status(404).json({ success: false, message: "Hotel not found" });
    res.status(200).json({ success: true, data: hotel });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Update a hotel
// @route   PUT /api/hotels/:id
const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!hotel)
      return res.status(404).json({ success: false, message: "Hotel not found" });
    res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      data: hotel,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete a hotel by ID
// @route   DELETE /api/hotels/:id
const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel)
      return res.status(404).json({ success: false, message: "Hotel not found" });
    res.status(200).json({
      success: true,
      message: "Hotel deleted successfully",
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Drop all hotels
// @route   DELETE /api/hotels/drop
const dropHotels = async (req, res) => {
  try {
    const result = await Hotel.deleteMany({});
    res.status(200).json({
      success: true,
      message: `All hotels dropped. ${result.deletedCount} record(s) removed.`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
  dropHotels,
};
