//@ts-nocheck
import { Router } from "express";
import {
  createCard,
  getAllCards,
  updateCardTitle,
  deleteCard,
  updateCardSameList,
  updateCardDifferentList,
} from "../controllers/cardController";
import { protect } from "../controllers/authController";

const router = Router();

router.use(protect);

router.route("/").post(createCard);

router.route("/getallcards").post(getAllCards);

router.route("/card/:cardId").post(updateCardTitle).delete(deleteCard);

router.route("/reorder/samelist").post(updateCardSameList);

router.route("/reorder/differentlist").post(updateCardDifferentList);

export default router;
