// const router = require("express").Router();
import express from "express";
import hotelController from "../controller/hotel.js";
import userController from "../controller/User.js";

const router = express.Router();

router.post("/", userController.verifyAdmin, hotelController.postHotels);
router.put("/:id", userController.verifyAdmin, hotelController.updateHotels);
router.delete("/:id", userController.verifyAdmin, hotelController.deleteHotels);
router.get("/:id", hotelController.viewHotel);
router.get("/", hotelController.viewAllHotels);

export default router;
