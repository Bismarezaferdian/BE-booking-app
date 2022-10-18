import express from "express";
import authController from "../controller/auth.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
// router.post("/token", authController.getToken);

export default router;
