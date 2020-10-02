"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Schema = mongoose_1.Schema;
const listSchema = new Schema({
    title: { type: String, required: true },
    listId: { type: String, required: true },
    cardIds: [{ type: String, ref: "cards" }],
    board: { type: Schema.Types.ObjectId, ref: "Boards" },
});
const List = mongoose_1.model("Lists", listSchema);
exports.default = List;
//# sourceMappingURL=listModel.js.map