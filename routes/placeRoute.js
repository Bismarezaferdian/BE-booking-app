import express from "express";
import placeController from "../controller/place.js";

const router = express.Router();

router.get("/", placeController.getPlace);
router.get("/count", placeController.placeWithAllHotel);
router.post("/", placeController.addPlace);
router.delete("/:id", placeController.deletePlace);
router.put("/:id", placeController.updatePlace);

export default router;
