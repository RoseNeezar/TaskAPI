"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cardController_1 = require("../controllers/cardController");
const authController_1 = require("../controllers/authController");
const router = express_1.Router();
router.use(authController_1.protect);
router.route("/").post(cardController_1.createCard);
router.route("/getallcards").post(cardController_1.getAllCards);
router.route("/card/:cardId").post(cardController_1.updateCardTitle).delete(cardController_1.deleteCard);
router.route("/reorder/samelist").post(cardController_1.updateCardSameList);
router.route("/reorder/differentlist").post(cardController_1.updateCardDifferentList);
exports.default = router;
//# sourceMappingURL=cardRouter.js.map