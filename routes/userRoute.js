import express from "express";
import userController from "../controller/user.js";
import { createVerifyToken, isAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//error cookie no detect when after deploy but test in posman success (401 failed verify token)
// router.put("/:id", createVerifyToken, isAdmin, userController.updateUsers);
// router.delete("/:id", createVerifyToken, isAdmin, userController.deleteUsers);
router.put("/:id", userController.updateUsers);
router.delete("/:id", createVerifyToken, isAdmin, userController.deleteUsers);
router.get("/:id", userController.viewUser);
router.get("/", userController.viewAllUsers);

export default router;
