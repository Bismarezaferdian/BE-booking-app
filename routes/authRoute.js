import express from "express";
import authController from "../controller/auth.js";
import { createVerifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
// router.post("/token", authController.getToken);

export default router;
