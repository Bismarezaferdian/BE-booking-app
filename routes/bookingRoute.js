import express from "express";
import bookingController from "../controller/booking.js";
import userController from "../controller/User.js";

const router = express.Router();

router.post("/", bookingController.postBooking);
router.get("/", userController.verifyAdmin, bookingController.viewAllBooking);

export default router;
