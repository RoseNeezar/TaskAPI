//@ts-nocheck
import { Router } from "express";
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import {
  signup,
  login,
  protect,
  restrictTo,
} from "../controllers/authController";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
// router.post("/forgotPassword", authController.forgotPassword);
// router.patch("/resetPassword/:token", authController.resetPassword);

// Protect all routes after this middleware
router.use(protect);

// router.patch("/updateMyPassword", authController.updatePassword);
// router.get("/me", userController.getMe, userController.getUser);
// router.patch("/updateMe", userController.updateMe);
// router.delete("/deleteMe", userController.deleteMe);

router.use(restrictTo("admin"));

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
