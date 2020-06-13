const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const Board = mongoose.model("Boards", boardSchema);

module.exports = Board;
