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
exports.deleteBoard = exports.updateListOrder = exports.createBoard = exports.getAllBoards = exports.getBoard = void 0;
const boardModel_1 = __importStar(require("../models/boardModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
exports.getBoard = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    boardModel_1.findOne({ _id: req.params.boardId })
        .exec()
        .then((board) => {
        if (!board) {
            return res
                .status(404)
                .json({ message: "Board with given id was not found" });
        }
        return res.status(200).json({ details: board });
    })
        .catch((error) => internalErrorResponse(error, res));
}));
exports.getAllBoards = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    boardModel_1.find({ user: req.user._id })
        .select("listOrder title _id")
        .exec()
        .then((boards) => {
        if (boards.length === 0) {
            const firstBoard = new boardModel_1.default({
                user: req.user._id,
                title: "First Board",
                listOrder: [],
            });
            return res.status(200).json({
                boards: [firstBoard],
            });
        }
        return res.status(200).json({ boards });
    });
}));
exports.createBoard = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    console.log(req.user);
    boardModel_1.find()
        .exec()
        .then((board) => {
        const newBoard = new boardModel_1.default({
            user: req.user._id,
            title,
            listOrder: [],
        });
        newBoard
            .save()
            .then((result) => res.status(201).json({ message: "created a new board", result }));
    });
}));
exports.updateListOrder = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId, newListOrder } = req.body;
    if (boardId && newListOrder) {
        console.log(boardId, newListOrder);
        const listUpdate = yield boardModel_1.findByIdAndUpdate({ _id: boardId }, { listOrder: newListOrder }, { new: true });
        const updatedListOrder = listUpdate.listOrder;
        console.log(listUpdate);
        res.status(200).json({ message: "Reorder success", updatedListOrder });
    }
    else {
        return res
            .status(400)
            .json({ message: "required parameters are missing" });
    }
}));
exports.deleteBoard = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    yield boardModel_1.findByIdAndDelete(boardId);
    res.status(200).json({ message: "Deleted board" });
}));
//# sourceMappingURL=boardController.js.map