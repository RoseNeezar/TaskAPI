import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const boardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  listOrder: [{ type: String, ref: "Lists" }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Board = model("Boards", boardSchema);

export default Board;
