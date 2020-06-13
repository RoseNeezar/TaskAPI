const express = require("express");
const cardController = require("./../controllers/cardController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.route("/").post(cardController.createCard);

router.route("/getallcards").post(cardController.getAllCards);

router
  .route("/card/:cardId")
  .post(cardController.updateCardTitle)
  .delete(cardController.deleteCard);

router.route("/reorder/samelist").post(cardController.updateCardSameList);

router
  .route("/reorder/differentlist")
  .post(cardController.updateCardDifferentList);

module.exports = router;
