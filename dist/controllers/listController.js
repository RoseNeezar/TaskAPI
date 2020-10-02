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
exports.deleteList = exports.getAllList = exports.getList = exports.updateListTitle = exports.createList = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const listModel_1 = __importStar(require("../models/listModel"));
const boardModel_1 = require("../models/boardModel");
const cardModel_1 = require("../models/cardModel");
exports.createList = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, boardId, listId } = req.body;
    yield listModel_1.find().exec();
    const newList = new listModel_1.default({
        board: boardId,
        title,
        cardIds: [],
        listId,
    });
    const result = yield newList.save();
    const board = yield boardModel_1.findById(boardId).exec();
    if (!board) {
        res.status(404).json({ message: "No Board exists of provided id" });
    }
    const newListOrder = Array.from(board.listOrder);
    debugger;
    newListOrder.push(result.listId);
    board.set({ listOrder: newListOrder });
    yield board.save();
    return res.status(201).json({
        message: "New list Added and also updated listOrder in board",
        list: result,
    });
}));
exports.updateListTitle = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { listId } = req.params;
    const listData = yield listModel_1.findOneAndUpdate({ listId: listId }, { title: req.body.title }, { new: true });
    if (!listData) {
        return res
            .status(404)
            .json({ message: "unable to find list of provided Id" });
    }
    res.status(200).json({ message: "list title updated ", data: listData });
}));
exports.getList = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield listModel_1.findOne({ listId: req.params.listId })
        .exec()
        .then((list) => {
        if (!list) {
            return res
                .status(404)
                .json({ message: "List with given id not found" });
        }
        return res.status(200).json({ message: "Success", data: list });
    });
}));
exports.getAllList = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    console.log(boardId);
    const board = yield boardModel_1.findOne({ _id: boardId }).select("listOrder").exec();
    if (!board) {
        return res
            .status(404)
            .json({ message: "Board with given id was not found" });
    }
    const list = yield listModel_1.find({ board: boardId })
        .select("cardIds title listId")
        .exec();
    let listInOrder = list.slice().sort((a, b) => {
        return (board.listOrder.indexOf(a.listId) - board.listOrder.indexOf(b.listId));
    });
    console.log(board, list, listInOrder);
    return res
        .status(200)
        .json({ message: "success", list: listInOrder, board: board });
}));
exports.deleteList = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { listId } = req.params;
    const removedList = listModel_1.find({ listId: listId }).deleteOne().exec();
    const removeCardFromList = cardModel_1.find({ list: listId }).deleteOne().exec();
    if (!removedList || !removeCardFromList) {
        return next(new AppError("No document found with that ID", 404));
    }
    yield boardModel_1.update({ listOrder: listId }, { $pull: { listOrder: listId } });
    res.status(204).json({
        status: "success",
        data: null,
    });
}));
//# sourceMappingURL=listController.js.map