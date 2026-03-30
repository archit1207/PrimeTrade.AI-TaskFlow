import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "./task.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import {
  createTaskValidation,
  updateTaskValidation
} from "./task.validation.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .get(getTasks)
  .post(createTaskValidation, validateRequest, createTask);

router.route("/:id")
  .get(getTaskById)
  .patch(updateTaskValidation, validateRequest, updateTask)
  .delete(deleteTask);

export default router;