import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getTaskStats } from "../api/taskApi";

const emptyStats = {
  total: 0,
  pending: 0,
  inProgress: 0,
  completed: 0,
  highPriority: 0,
};

export const useTaskStats = () => {
  const [stats, setStats] = useState(emptyStats);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getTaskStats();
      setStats({ ...emptyStats, ...(response.data || {}) });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, isLoading, refetch: fetchStats };
};
