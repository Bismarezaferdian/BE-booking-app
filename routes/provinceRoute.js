import express from "express";
import provinceController from "../controller/province.js";
const router = express.Router();

router.get("/", provinceController.getProvince);

export default router;
