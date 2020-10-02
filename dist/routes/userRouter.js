"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authController_1 = require("../controllers/authController");
const router = express_1.Router();
router.post("/signup", authController_1.signup);
router.post("/login", authController_1.login);
router.use(authController_1.protect);
router.use(authController_1.restrictTo("admin"));
router.route("/").get(userController_1.getAllUsers).post(userController_1.createUser);
router.route("/:id").get(userController_1.getUser).patch(userController_1.updateUser).delete(userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRouter.js.map