const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listSchema = new Schema({
  title: { type: String, required: true },
  listId: { type: String, required: true },
  cardIds: [{ type: String, ref: "cards" }],
  board: { type: Schema.Types.ObjectId, ref: "Boards" },
  // cards:{type: mongoose.Schema.Types.ObjectId, ref: 'tasks'}
});

const List = mongoose.model("Lists", listSchema);

module.exports = List;
