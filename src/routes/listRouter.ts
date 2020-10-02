//@ts-nocheck
import { Router } from "express";
import {
  createList,
  updateListTitle,
  getList,
  deleteList,
  getAllList,
} from "../controllers/listController";
import { protect } from "../controllers/authController";

const router = Router();

router.use(protect);

router.route("/").post(createList);

router.route("/:listId").post(updateListTitle);

router.route("/list/:listId").get(getList).delete(deleteList);

router.route("/all/:boardId").get(getAllList);

export default router;
