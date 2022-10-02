import express from "express";
import roomController from "../controller/room.js";
import userController from "../controller/user.js";
import { createVerifyToken, isAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/", roomController.getRoom);
// router.post("/:idHotel", roomController.postRoom);
router.post("/:idHotel", createVerifyToken, isAdmin, roomController.postRoom);
router.put("/:id", createVerifyToken, isAdmin, roomController.updateRoom);
router.put("/availability/:id", roomController.updateAvilabilityRoom);
router.delete("/:id", userController.verifyUser, roomController.deleteRoom);
// router.delete(
//   "/:id/:idHotel",
//   userController.verifyUser,
//   roomController.deleteRoom
// );
router.get("/:id", userController.verifyUser, roomController.viewRoom);
router.get("/", userController.verifyAdmin, roomController.viewAllRooms);

export default router;
