const express = require("express");
const router = express.Router();
const {
  createRoom,
  getAllRooms,
  getRoomById,
  getAvailableRooms,
  updateRoom,
  deleteRoom,
  dropRooms,
} = require("../controllers/roomController");

// DROP and /available must come before /:id
router.delete("/drop", dropRooms);
router.get("/available", getAvailableRooms);

router.route("/").get(getAllRooms).post(createRoom);
router.route("/:id").get(getRoomById).put(updateRoom).delete(deleteRoom);

module.exports = router;
