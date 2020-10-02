"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const appError_1 = __importDefault(require("./utils/appError"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const boardRouter_1 = __importDefault(require("./routes/boardRouter"));
const listRouter_1 = __importDefault(require("./routes/listRouter"));
const cardRouter_1 = __importDefault(require("./routes/cardRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
app.use(helmet_1.default());
if (process.env.NODE_ENV === "development") {
    app.use(morgan_1.default("dev"));
}
app.use(express_1.json({ limit: "10kb" }));
app.use(express_mongo_sanitize_1.default());
app.use(xss_clean_1.default());
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});
app.use("/api/v1/boards", boardRouter_1.default);
app.use("/api/v1/lists", listRouter_1.default);
app.use("/api/v1/cards", cardRouter_1.default);
app.use("/api/v1/users", userRouter_1.default);
app.all("*", (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorController_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map