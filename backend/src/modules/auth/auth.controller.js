import generateToken from "../../utils/generateToken.js";
import { createUser, loginUser } from "./auth.service.js";

export const register = async (req, res, next) => {
  try {
    const user = await createUser(req.body);

    const token = generateToken({
      id: user._id,
      role: user.role
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await loginUser(req.body);

    const token = generateToken({
      id: user._id,
      role: user.role
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message || "Invalid credentials"
    });
  }
};

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};