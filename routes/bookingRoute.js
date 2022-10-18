import express from "express";
import bookingController from "../controller/booking.js";
import userController from "../controller/user.js";
// import { createVerifyToken, isAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//error cookie no detect when after deploy but test in posman success (401 failed verify token)
// router.post("/", createVerifyToken, isAdmin, bookingController.postBooking);
router.post("/", bookingController.postBooking);
router.get("/", bookingController.viewAllBooking);
router.delete(
  "/:id",
  userController.verifyAdmin,
  bookingController.deleteBooking
);

export default router;
