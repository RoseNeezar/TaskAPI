export default class AppError extends Error {
  constructor(message?: string, statusCode?: number, isOperational?: boolean) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    statusCode = statusCode;
    status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
