// const router = require("express").Router();
import express from "express";
import hotelController from "../controller/hotel.js";
import { createVerifyToken, isAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.post("/", hotelController.postHotels);
router.post("/", createVerifyToken, isAdmin, hotelController.postHotels);
router.put("/:id", createVerifyToken, isAdmin, hotelController.updateHotels);
router.delete("/:id", createVerifyToken, isAdmin, hotelController.deleteHotels);
router.get("/", hotelController.viewAllHotels);
router.get("/find/:id", hotelController.viewHotel);
router.get("/CountCity", hotelController.countByCity);
router.get("/CountType", hotelController.countType);
router.get("/room/:id", hotelController.getHotelrooms);

export default router;
