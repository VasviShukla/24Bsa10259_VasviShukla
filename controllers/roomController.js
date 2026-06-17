const Room = require("../models/Room");

// @desc    Create a new room (linked to a hotel)
// @route   POST /api/rooms
const createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    const populated = await room.populate("hotel", "name location");
    res.status(201).json({
      success: true,
      message: "Room created successfully",
      data: populated,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get all rooms (with hotel info)
// @route   GET /api/rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate("hotel", "name location starRating")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get a single room by ID
// @route   GET /api/rooms/:id
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate(
      "hotel",
      "name location phone email"
    );
    if (!room)
      return res.status(404).json({ success: false, message: "Room not found" });
    res.status(200).json({ success: true, data: room });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get all available rooms
// @route   GET /api/rooms/available
const getAvailableRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true }).populate(
      "hotel",
      "name location starRating"
    );
    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update a room
// @route   PUT /api/rooms/:id
const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("hotel", "name location");
    if (!room)
      return res.status(404).json({ success: false, message: "Room not found" });
    res.status(200).json({
      success: true,
      message: "Room updated successfully",
      data: room,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete a room by ID
// @route   DELETE /api/rooms/:id
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room)
      return res.status(404).json({ success: false, message: "Room not found" });
    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Drop all rooms
// @route   DELETE /api/rooms/drop
const dropRooms = async (req, res) => {
  try {
    const result = await Room.deleteMany({});
    res.status(200).json({
      success: true,
      message: `All rooms dropped. ${result.deletedCount} record(s) removed.`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  getAvailableRooms,
  updateRoom,
  deleteRoom,
  dropRooms,
};
