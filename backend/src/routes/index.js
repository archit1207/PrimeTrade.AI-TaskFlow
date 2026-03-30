import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import taskRoutes from "../modules/tasks/task.routes.js";
import userRoutes from "../modules/users/user.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);

export default router;