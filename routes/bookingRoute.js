import express from "express";
import bookingController from "../controller/booking.js";
import userController from "../controller/User.js";
import { createVerifyToken, isAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", createVerifyToken, isAdmin, bookingController.postBooking);
router.get("/", userController.verifyAdmin, bookingController.viewAllBooking);
router.delete(
  "/:id",
  userController.verifyAdmin,
  bookingController.deleteBooking
);

export default router;