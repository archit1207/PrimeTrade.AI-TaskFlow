import Task from "../../models/Task.js";

export const createTaskService = async (data, userId) => {
  return await Task.create({
    ...data,
    user: userId
  });
};

export const getTasksService = async (user) => {
  if (user.role === "admin") {
    return await Task.find().populate("user", "name email role");
  }

  return await Task.find({ user: user._id }).populate("user", "name email role");
};

export const getTaskByIdService = async (taskId) => {
  return await Task.findById(taskId).populate("user", "name email role");
};

export const updateTaskService = async (taskId, data) => {
  return await Task.findByIdAndUpdate(taskId, data, {
    new: true,
    runValidators: true
  }).populate("user", "name email role");
};

export const deleteTaskService = async (taskId) => {
  return await Task.findByIdAndDelete(taskId);
};