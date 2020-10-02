//@ts-nocheck
import express, { json } from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";
import boardRouter from "./routes/boardRouter";
import listRouter from "./routes/listRouter";
import cardRouter from "./routes/cardRouter";
import userRouter from "./routes/userRouter";
import cors from "cors";

const app = express();
app.use(cors());
// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser, reading data from body into req.body
app.use(json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) ROUTES
app.use("/api/v1/boards", boardRouter);
app.use("/api/v1/lists", listRouter);
app.use("/api/v1/cards", cardRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
