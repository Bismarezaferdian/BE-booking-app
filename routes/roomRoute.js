import express from "express";
import roomController from "../controller/room.js";
import userController from "../controller/user.js";

const router = express.Router();

// router.get("/", roomController.getRoom);
router.post("/:idHotel", userController.verifyUser, roomController.postRoom);
router.put("/:id", userController.verifyUser, roomController.updateRoom);
router.delete(
  "/:id/:idHotel",
  userController.verifyUser,
  roomController.deleteRoom
);
router.get("/:id", userController.verifyUser, roomController.viewRoom);
router.get("/", userController.verifyAdmin, roomController.viewAllRooms);

export default router;
