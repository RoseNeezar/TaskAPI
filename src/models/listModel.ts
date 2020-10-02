import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const listSchema = new Schema({
  title: { type: String, required: true },
  listId: { type: String, required: true },
  cardIds: [{ type: String, ref: "cards" }],
  board: { type: Schema.Types.ObjectId, ref: "Boards" },
  // cards:{type: mongoose.Schema.Types.ObjectId, ref: 'tasks'}
});

const List = model("Lists", listSchema);

export default List;
