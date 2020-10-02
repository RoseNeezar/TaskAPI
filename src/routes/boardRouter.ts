import { Router } from "express";
import { protect } from "../controllers/authController";
import {
  createBoard,
  updateListOrder,
  getBoard,
  deleteBoard,
  getAllBoards,
} from "../controllers/boardController";

const router = Router();

router.use(protect);

router.route("/").post(createBoard).patch(updateListOrder);

router.route("/board/:boardId").get(getBoard).delete(deleteBoard);

router.route("/all").get(getAllBoards);

export default router;
