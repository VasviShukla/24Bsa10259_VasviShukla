const express = require("express");
const router = express.Router();
const {
  createGuest,
  getAllGuests,
  getGuestById,
  updateGuest,
  deleteGuest,
  dropGuests,
} = require("../controllers/guestController");

// DROP must come before /:id
router.delete("/drop", dropGuests);

router.route("/").get(getAllGuests).post(createGuest);
router.route("/:id").get(getGuestById).put(updateGuest).delete(deleteGuest);

module.exports = router;
