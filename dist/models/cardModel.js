"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Schema = mongoose_1.Schema;
const CardSchema = new Schema({
    cardId: { type: String },
    title: { type: String, required: true },
    list: { type: String, ref: "cards" },
});
const Card = mongoose_1.model("tasks", CardSchema);
exports.default = Card;
//# sourceMappingURL=cardModel.js.map