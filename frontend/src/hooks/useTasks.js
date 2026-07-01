import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { deleteTask as deleteTaskRequest, getTasks } from "../api/taskApi";

const cleanFilters = (filters) => {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== "" && value !== undefined)
  );
};

export const useTasks = (filters) => {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
    limit: 9,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const params = useMemo(() => cleanFilters(filters), [filters]);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await getTasks(params);
      setTasks(Array.isArray(response.data) ? response.data : []);
      setPagination({
        total: response.total || 0,
        page: response.page || 1,
        pages: response.pages || 1,
        limit: response.limit || Number(params.limit) || 9,
      });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const removeTask = async (id) => {
    setIsDeleting(true);
    try {
      await deleteTaskRequest(id);
      setTasks((current) => current.filter((task) => task._id !== id));
      toast.success("Task deleted successfully");
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    tasks,
    pagination,
    isLoading,
    isDeleting,
    error,
    refetch: fetchTasks,
    removeTask,
  };
};
