import api from "./axios";

export const getTasks = async (params = {}) => {
  const { data } = await api.get("/tasks", { params });
  return data;
};

export const getTask = async (id) => {
  const { data } = await api.get(`/tasks/${id}`);
  return data;
};

export const getTaskStats = async () => {
  const { data } = await api.get("/tasks/stats");
  return data;
};

export const getDeletedTasks = async (params = {}) => {
  const { data } = await api.get("/tasks/trash", { params });
  return data;
};

export const createTask = async (payload) => {
  const { data } = await api.post("/tasks", payload);
  return data;
};

export const updateTask = async (id, payload) => {
  const { data } = await api.put(`/tasks/${id}`, payload);
  return data;
};

export const deleteTask = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};

export const restoreTask = async (id) => {
  const { data } = await api.post(`/tasks/${id}/restore`);
  return data;
};
