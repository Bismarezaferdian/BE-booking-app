import express from "express";
import userController from "../controller/user.js";
import { createVerifyToken, isAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.put("/:id", createVerifyToken, isAdmin, userController.updateUsers);
router.delete("/:id", createVerifyToken, isAdmin, userController.deleteUsers);
router.get("/:id", userController.viewUser);
router.get("/", userController.viewAllUsers);

export default router;
