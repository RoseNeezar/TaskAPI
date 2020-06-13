const express = require("express");
const listController = require("./../controllers/listController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.route("/").post(listController.createList);

router.route("/:listId").post(listController.updateListTitle);

router
  .route("/list/:listId")
  .get(listController.getList)
  .delete(listController.deleteList);

router.route("/all/:boardId").get(listController.getAllList);

module.exports = router;
