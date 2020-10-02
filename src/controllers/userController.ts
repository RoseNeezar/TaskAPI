//@ts-nocheck
import User, { findByIdAndUpdate } from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { getOne, getAll, updateOne, deleteOne } from "./handleFactory";

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export function getMe(req, res, next) {
  req.params.id = req.user.id;
  next();
}

export const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");

  // 3) Update user document
  const updatedUser = await findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  await findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export function createUser(req, res) {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup instead",
  });
}

export const getUser = getOne(User);
export const getAllUsers = getAll(User);

export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);