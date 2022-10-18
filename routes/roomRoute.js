import express from "express";
import roomController from "../controller/room.js";
// import { createVerifyToken, isAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//error cookie no detect when after deploy but test in posman success (401 failed verify token)
// router.post("/:idHotel", createVerifyToken, isAdmin, roomController.postRoom);
// router.put("/:id", createVerifyToken, isAdmin, roomController.updateRoom);
// router.delete("/:id", createVerifyToken, isAdmin, roomController.deleteRoom);
router.delete("/:id", roomController.deleteRoom);
router.post("/:idHotel", roomController.postRoom);
router.put("/:id", roomController.updateRoom);
router.put("/availability/:id", roomController.updateAvilabilityRoom);
// router.delete(
//   "/:id/:idHotel",
//   userController.verifyUser,
//   roomController.deleteRoom
// );
router.get("/:id", roomController.viewRoom);
router.get("/", roomController.viewAllRooms);

export default router;
