const express = require("express");
const router = express.Router();
const {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
  dropHotels,
} = require("../controllers/hotelController");

// DROP must come before /:id to avoid conflict
router.delete("/drop", dropHotels);

router.route("/").get(getAllHotels).post(createHotel);
router.route("/:id").get(getHotelById).put(updateHotel).delete(deleteHotel);

module.exports = router;
