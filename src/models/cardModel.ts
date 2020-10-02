import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const CardSchema = new Schema({
  cardId: { type: String },
  title: { type: String, required: true },
  list: { type: String, ref: "cards" },
});

const Card = model("tasks", CardSchema);

export default Card;
