const catchAsync = require("./../utils/catchAsync");
const List = require("./../models/listModel");
const Board = require("./../models/boardModel");
const Card = require("../models/cardModel");

exports.createList = catchAsync(async (req, res, next) => {
  const { title, boardId, listId } = req.body;
  await List.find().exec();
  const newList = new List({
    board: boardId,
    title,
    cardIds: [],
    listId,
  });
  const result = await newList.save();
  const board = await Board.findById(boardId).exec();
  if (!board) {
    res.status(404).json({ message: "No Board exists of provided id" });
  }
  const newListOrder = Array.from(board.listOrder);
  debugger;
  newListOrder.push(result.listId);
  board.set({ listOrder: newListOrder });
  await board.save();
  return res.status(201).json({
    message: "New list Added and also updated listOrder in board",
    list: result,
  });
});

exports.updateListTitle = catchAsync(async (req, res) => {
  const { listId } = req.params;

  const listData = await List.findOneAndUpdate(
    { listId: listId },
    { title: req.body.title },
    { new: true }
  );

  if (!listData) {
    return res
      .status(404)
      .json({ message: "unable to find list of provided Id" });
  }
  res.status(200).json({ message: "list title updated ", data: listData });
});

exports.getList = catchAsync(async (req, res, next) => {
  await List.findOne({ listId: req.params.listId })
    .exec()
    .then((list) => {
      if (!list) {
        return res
          .status(404)
          .json({ message: "List with given id not found" });
      }
      return res.status(200).json({ message: "Success", data: list });
    });
});

exports.getAllList = catchAsync(async (req, res, next) => {
  const { boardId } = req.params;
  console.log(boardId);

  const board = await Board.findOne({ _id: boardId })
    .select("listOrder")
    .exec();
  if (!board) {
    return res
      .status(404)
      .json({ message: "Board with given id was not found" });
  }
  const list = await List.find({ board: boardId })
    .select("cardIds title listId")
    .exec();

  let listInOrder = list.slice().sort((a, b) => {
    return (
      board.listOrder.indexOf(a.listId) - board.listOrder.indexOf(b.listId)
    );
  });
  console.log(board, list, listInOrder);
  return res
    .status(200)
    .json({ message: "success", list: listInOrder, board: board });
});

exports.deleteList = catchAsync(async (req, res, next) => {
  const { listId } = req.params;
  const removedList = List.find({ listId: listId }).deleteOne().exec();
  const removeCardFromList = Card.find({ list: listId }).deleteOne().exec();
  if (!removedList || !removeCardFromList) {
    return next(new AppError("No document found with that ID", 404));
  }
  await Board.update({ listOrder: listId }, { $pull: { listOrder: listId } });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
