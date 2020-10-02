//@ts-nocheck
import Board, {
  findOne,
  find,
  findByIdAndUpdate,
  findByIdAndDelete,
} from "../models/boardModel";
import catchAsync from "../utils/catchAsync";

export const getBoard = catchAsync(async (req: any, res: any, next: any) => {
  findOne({ _id: req.params.boardId })
    .exec()
    .then((board: any) => {
      if (!board) {
        return res
          .status(404)
          .json({ message: "Board with given id was not found" });
      }
      return res.status(200).json({ details: board });
    })
    .catch((error: any) => internalErrorResponse(error, res));
});

export const getAllBoards = catchAsync(
  async (req: any, res: any, next: any) => {
    console.log(req);
    find({ user: req.user._id })
      .select("listOrder title _id")
      .exec()
      .then((boards: any) => {
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
  }
);

export const createBoard = catchAsync(async (req: any, res: any, next: any) => {
  const { title } = req.body;
  console.log(req.user);
  find()
    .exec()
    .then((board: any) => {
      const newBoard = new Board({
        user: req.user._id,
        title,
        listOrder: [],
      });

      newBoard
        .save()
        .then((result: any) =>
          res.status(201).json({ message: "created a new board", result })
        );
    });
});

export const updateListOrder = catchAsync(
  async (req: any, res: any, next: any) => {
    const { boardId, newListOrder } = req.body;
    if (boardId && newListOrder) {
      console.log(boardId, newListOrder);
      const listUpdate = await findByIdAndUpdate(
        { _id: boardId },
        { listOrder: newListOrder },
        { new: true }
      );

      const updatedListOrder = listUpdate.listOrder;
      console.log(listUpdate);

      res.status(200).json({ message: "Reorder success", updatedListOrder });
    } else {
      return res
        .status(400)
        .json({ message: "required parameters are missing" });
    }
  }
);

export const deleteBoard = catchAsync(async (req: any, res: any, next: any) => {
  const { boardId } = req.params;
  await findByIdAndDelete(boardId);
  res.status(200).json({ message: "Deleted board" });
});
