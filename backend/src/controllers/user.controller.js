import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import {
  getUserById,
  updateUser,
  deleteUser,
} from "../services/user.service.js";
import User from "../models/User.js";
import { uploadonCLOUDNARY } from "../config/cloudnary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    if ([name, email, password, role, phone].some((f) => !f?.trim())) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const allowedRoles = ["doctor", "patient", "admin"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }
    console.log(allowedRoles);

    const existingUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this name or email already exists",
      });
    }
    console.log(existingUser);

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    if (!avatarLocalPath) {
      return res.status(400).json({
        success: false,
        message: "Avatar is required",
      });
    }
    console.log(avatarLocalPath);

    const avatar = await uploadonCLOUDNARY(avatarLocalPath);
    if (!avatar) {
      return res.status(500).json({
        success: false,
        message: "Error uploading avatar",
      });
    }
    console.log(avatar);

    const user = await User.create({
      name: name.toLowerCase(),
      email,
      password,
      role,
      phone,
      avatar: {
        url: avatar.secure_url,
        public_id: avatar.public_id,
      },
    });
    console.log(user);

    const createdUser = user.toObject();
    delete createdUser.password;

    return res.status(201).json({
      success: true,
      data: createdUser,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Register Controller Error:", error);
    return res.status(500).json({ success: false, message: error.message });
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
