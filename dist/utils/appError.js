"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode, isOperational) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
        statusCode = statusCode;
        status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
//# sourceMappingURL=appError.js.map