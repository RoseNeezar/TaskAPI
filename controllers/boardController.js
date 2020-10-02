const Board = require("./../models/boardModel");
const catchAsync = require("./../utils/catchAsync");

exports.getBoard = catchAsync(async (req, res, next) => {
  Board.findOne({ _id: req.params.boardId })
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
});

exports.getAllBoards = catchAsync(async (req, res, next) => {
  console.log(req);
  Board.find({ user: req.user._id })
    .select("listOrder title _id")
    .exec()
    .then((boards) => {
      if (boards.length === 0) {
        const firstBoard = new Board({
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
});

exports.createBoard = catchAsync(async (req, res, next) => {
  const { title } = req.body;
  console.log(req.user);
  Board.find()
    .exec()
    .then((board) => {
      const newBoard = new Board({
        user: req.user._id,
        title,
        listOrder: [],
      });

      newBoard
        .save()
        .then((result) =>
          res.status(201).json({ message: "created a new board", result })
        );
    });
});

exports.updateListOrder = catchAsync(async (req, res, next) => {
  const { boardId, newListOrder } = req.body;
  if (boardId && newListOrder) {
    console.log(boardId, newListOrder);
    const listUpdate = await Board.findByIdAndUpdate(
      { _id: boardId },
      { listOrder: newListOrder },
      { new: true }
    );

    const updatedListOrder = listUpdate.listOrder;
    console.log(listUpdate);

    res.status(200).json({ message: "Reorder success", updatedListOrder });
  } else {
    return res.status(400).json({ message: "required parameters are missing" });
  }
});

exports.deleteBoard = catchAsync(async (req, res, next) => {
  const { boardId } = req.params;
  await Board.findByIdAndDelete(boardId);
  res.status(200).json({ message: "Deleted board" });
});
