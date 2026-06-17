const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBookingById,
  cancelBooking,
  updateBooking,
  deleteBooking,
  dropBookings,
} = require("../controllers/bookingController");

// DROP must come before /:id
router.delete("/drop", dropBookings);

router.route("/").get(getAllBookings).post(createBooking);
router.route("/:id").get(getBookingById).put(updateBooking).delete(deleteBooking);
router.put("/:id/cancel", cancelBooking);

module.exports = router;
