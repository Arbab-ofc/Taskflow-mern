import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getDeletedTasks, restoreTask as restoreTaskRequest } from "../api/taskApi";

const cleanFilters = (filters) => {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== "" && value !== undefined)
  );
};

export const useDeletedTasks = (filters) => {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
    limit: 9,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRestoring, setIsRestoring] = useState(false);

  const params = useMemo(() => cleanFilters(filters), [filters]);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getDeletedTasks(params);
      setTasks(Array.isArray(response.data) ? response.data : []);
      setPagination({
        total: response.total || 0,
        page: response.page || 1,
        pages: response.pages || 1,
        limit: response.limit || Number(params.limit) || 9,
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const restoreTask = async (id) => {
    setIsRestoring(true);
    try {
      await restoreTaskRequest(id);
      setTasks((current) => current.filter((task) => task._id !== id));
      setPagination((current) => ({
        ...current,
        total: Math.max(current.total - 1, 0),
      }));
      toast.success("Task restored successfully");
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    } finally {
      setIsRestoring(false);
    }
  };

  return {
    tasks,
    pagination,
    isLoading,
    isRestoring,
    refetch: fetchTasks,
    restoreTask,
  };
};
