"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listController_1 = require("../controllers/listController");
const authController_1 = require("../controllers/authController");
const router = express_1.Router();
router.use(authController_1.protect);
router.route("/").post(listController_1.createList);
router.route("/:listId").post(listController_1.updateListTitle);
router.route("/list/:listId").get(listController_1.getList).delete(listController_1.deleteList);
router.route("/all/:boardId").get(listController_1.getAllList);
exports.default = router;
//# sourceMappingURL=listRouter.js.map