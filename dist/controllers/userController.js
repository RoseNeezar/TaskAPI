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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getUser = exports.createUser = exports.deleteMe = exports.updateMe = exports.getMe = void 0;
const userModel_1 = __importStar(require("../models/userModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const handleFactory_1 = require("./handleFactory");
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el))
            newObj[el] = obj[el];
    });
    return newObj;
};
function getMe(req, res, next) {
    req.params.id = req.user.id;
    next();
}
exports.getMe = getMe;
exports.updateMe = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.password || req.body.passwordConfirm) {
        return next(new appError_1.default("This route is not for password updates. Please use /updateMyPassword.", 400));
    }
    const filteredBody = filterObj(req.body, "name", "email");
    const updatedUser = yield userModel_1.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: "success",
        data: {
            user: updatedUser,
        },
    });
}));
exports.deleteMe = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModel_1.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
        status: "success",
        data: null,
    });
}));
function createUser(req, res) {
    res.status(500).json({
        status: "error",
        message: "This route is not defined! Please use /signup instead",
    });
}
exports.createUser = createUser;
exports.getUser = handleFactory_1.getOne(userModel_1.default);
exports.getAllUsers = handleFactory_1.getAll(userModel_1.default);
exports.updateUser = handleFactory_1.updateOne(userModel_1.default);
exports.deleteUser = handleFactory_1.deleteOne(userModel_1.default);
//# sourceMappingURL=userController.js.map