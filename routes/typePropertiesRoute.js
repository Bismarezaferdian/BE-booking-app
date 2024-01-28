import express from "express";
import propertiesController from "../controller/properties.js";
// import propertiesController from "../controller/properties.js";

const router = express.Router();

router.get("/", propertiesController.getProperties);
router.get("/count", propertiesController.propertiesWithAllHotel);
router.post("/", propertiesController.addProperties);
router.put("/:id", propertiesController.updateProperties);
router.delete("/:id", propertiesController.deleteProperties);

export default router;
