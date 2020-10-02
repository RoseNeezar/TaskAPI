"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCard = exports.updateCardDifferentList = exports.updateCardSameList = exports.updateCardTitle = exports.getAllCards = exports.createCard = void 0;
const cardModel_1 = __importStar(require("../models/cardModel"));
const listModel_1 = require("../models/listModel");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
exports.createCard = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, listId, cardId } = req.body;
    yield cardModel_1.find().exec();
    const newCard = new cardModel_1.default({
        title,
        list: listId,
        cardId,
    });
    const result = yield newCard.save();
    const list = yield listModel_1.findOne({ listId }).exec();
    if (!list) {
        return res
            .status(404)
            .json({ message: "List of provided id doesn't exist" });
    }
    const newCardIds = Array.from(list.cardIds);
    newCardIds.push(result.cardId);
    list.set({ cardIds: newCardIds });
    const result2 = yield list.save();
    return res.status(201).json({
        message: "new card is created and also cardIds in listId is also updated",
        card: result,
        list: result2,
    });
}));
const findAllCards = (listId) => cardModel_1.find({ list: listId }).select("cardId title list");
exports.getAllCards = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { listIds } = req.body;
    let totalCards = [];
    if (listIds && listIds.length > 0) {
        let i = 0;
        for (const listId of listIds) {
            const cards = yield findAllCards(listId);
            if (cards.length > 0) {
                totalCards.push(cards);
            }
        }
        res.status(200).json({ message: "Success", cards: totalCards });
    }
}));
exports.updateCardTitle = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cardId } = req.params;
    const card = yield cardModel_1.findOneAndUpdate({ cardId: cardId }, {
        title: req.body.title,
    }, { new: true }).select("-__v");
    if (!card) {
        return res
            .status(404)
            .json({ message: "unable to find card of provided Id " });
    }
    return res.status(201).json({ status: "success", data: card });
}));
exports.updateCardSameList = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { sameListId, sameListCardIds } = req.body;
    console.log(sameListId, sameListCardIds);
    const list = yield listModel_1.findOne({ listId: sameListId });
    if (!list) {
        return res
            .status(404)
            .json({ message: "unable to find List of provided id" });
    }
    list.set({ cardIds: sameListCardIds });
    const savedList = yield list.save();
    return res
        .status(200)
        .json({ message: "same List reorder success", savedList });
}));
exports.updateCardDifferentList = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { removedListId, addedListId, removedListCardIds, addedListCardIds, } = req.body;
    if (!(removedListId && addedListId && removedListCardIds && addedListCardIds)) {
        return res.status(400).json({ message: "some fields are missing" });
    }
    console.log(req.body);
    const removedlist = yield listModel_1.findOne({ listId: removedListId });
    removedlist.set({ cardIds: removedListCardIds });
    const removeLists = yield removedlist.save();
    const addedlist = yield listModel_1.findOne({ listId: addedListId });
    addedlist.set({ cardIds: addedListCardIds });
    const addedLists = yield addedlist.save();
    res.status(200).json({
        message: "different list reorder success",
        removeLists,
        addedLists,
    });
}));
exports.deleteCard = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { cardId } = req.params;
    yield cardModel_1.find({ cardId: cardId }).deleteOne().exec();
    yield listModel_1.update({ cardIds: cardId }, { $pull: { cardIds: cardId } });
    res.status(200).json({
        status: "Success",
    });
}));
//# sourceMappingURL=cardController.js.map