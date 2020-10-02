"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Schema = mongoose_1.Schema;
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
const Board = mongoose_1.model("Boards", boardSchema);
exports.default = Board;
//# sourceMappingURL=boardModel.js.map