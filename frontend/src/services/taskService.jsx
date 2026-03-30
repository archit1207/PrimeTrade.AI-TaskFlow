import API from "./api";

export const getTasks = async () => {
  const response = await API.get("/tasks");
  return response.data;
};

export const createTask = async (data) => {
  const response = await API.post("/tasks", data);
  return response.data;
};

export const updateTask = async (id, data) => {
  const response = await API.patch(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await API.delete(`/tasks/${id}`);
  return response.data;
};