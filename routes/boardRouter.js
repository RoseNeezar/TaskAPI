const express = require("express");
const authController = require("./../controllers/authController");
const boardController = require("./../controllers/boardController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .post(boardController.createBoard)
  .patch(boardController.updateListOrder);

router
  .route("/board/:boardId")
  .get(boardController.getBoard)
  .delete(boardController.deleteBoard);

router.route("/all").get(boardController.getAllBoards);

module.exports = router;
