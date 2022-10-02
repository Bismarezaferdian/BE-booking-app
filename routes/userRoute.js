import express from "express";
import userController from "../controller/User.js";
// import { createVerifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkAuth", createVerifyToken, (req, res, next) => {
//   res.send("you are autenticated !");
// });
// router.get("/checkUser/:id", userController.verifyUser, (req, res, next) => {
//   res.send("you are user  !");
// });
// router.get("/checkAdmin/:id", userController.verifyAdmin, (req, res, next) => {
//   res.send("you are admin !");
// });

// router.get("/user", userController.verifyUser, userController.user);
// router.post("/", userController.verifyUser, userController.postUsers);
router.put("/:id", userController.verifyUser, userController.updateUsers);
router.delete("/:id", userController.verifyUser, userController.deleteUsers);
router.get("/:id", userController.verifyUser, userController.viewUser);
router.get("/", userController.verifyAdmin, userController.viewAllUsers);

export default router;
