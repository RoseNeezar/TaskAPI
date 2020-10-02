"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const boardController_1 = require("../controllers/boardController");
const router = express_1.Router();
router.use(authController_1.protect);
router.route("/").post(boardController_1.createBoard).patch(boardController_1.updateListOrder);
router.route("/board/:boardId").get(boardController_1.getBoard).delete(boardController_1.deleteBoard);
router.route("/all").get(boardController_1.getAllBoards);
exports.default = router;
//# sourceMappingURL=boardRouter.js.map