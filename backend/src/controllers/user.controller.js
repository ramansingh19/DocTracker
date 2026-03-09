import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import {
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/user.service.js";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    if (
      [name, email, password, role, phone].some((field) => field?.trim() === "")
    ) {
      return res.status(404).json({
        success: false,
        message: "fill all the requirement",
      });
    }

    const exitedUser = await User.findOne({
      $or: [{name}, {email}],
    });
    if (!exitedUser) {
      return res.status(404).json({
        success: false,
        message: "Already exitsed",
      });
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    if (!avatarLocalPath) {
      return res.status(404).json({
        success: false,
        message: "You have to upload avatar",
      });
    }

    


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUser = catchAsync(async (req, res) => {
  const user = await getUserById(req.params.userId);
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  res.json(user);
});

export const updateUserProfile = catchAsync(async (req, res) => {
  const user = await updateUser(req.params.userId, req.body);
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  res.json(user);
});

export const removeUser = catchAsync(async (req, res) => {
  const user = await deleteUser(req.params.userId);
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  res.status(httpStatus.NO_CONTENT).send();
});
