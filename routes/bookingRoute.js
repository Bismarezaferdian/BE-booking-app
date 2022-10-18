import express from "express";
import bookingController from "../controller/booking.js";
import userController from "../controller/user.js";
// import { createVerifyToken, isAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.post("/", createVerifyToken, isAdmin, bookingController.postBooking);
router.post("/", bookingController.postBooking);
router.get("/", bookingController.viewAllBooking);
router.delete(
  "/:id",
  userController.verifyAdmin,
  bookingController.deleteBooking
);

export default router;
