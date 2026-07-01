import { LayoutGrid, List, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteConfirmModal from "../components/task/DeleteConfirmModal";
import TaskCard from "../components/task/TaskCard";
import TaskFilters from "../components/task/TaskFilters";
import TaskPagination from "../components/task/TaskPagination";
import TaskStats from "../components/task/TaskStats";
import TaskTable from "../components/task/TaskTable";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import PageWrapper from "../components/layout/PageWrapper";
import { useDebounce } from "../hooks/useDebounce";
import { useTasks } from "../hooks/useTasks";
import { useTaskStats } from "../hooks/useTaskStats";

const Dashboard = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    sort: "newest",
    page: 1,
    limit: 9,
  });
  const [viewMode, setViewMode] = useState("grid");
  const [taskToDelete, setTaskToDelete] = useState(null);
  const debouncedSearch = useDebounce(filters.search, 300);
  const effectiveFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch }),
    [debouncedSearch, filters.limit, filters.page, filters.priority, filters.sort, filters.status]
  );
  const { tasks, pagination, isLoading, isDeleting, removeTask } = useTasks(effectiveFilters);
  const { stats, refetch: refetchStats } = useTaskStats();

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target?.isContentEditable;

      if (event.key === "Escape" && taskToDelete) {
        setTaskToDelete(null);
        return;
      }

      if (isTyping) return;

      if (event.key.toLowerCase() === "n") {
        event.preventDefault();
        navigate("/tasks/new");
      }

      if (event.key === "/") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, taskToDelete]);

  const updateFilters = (nextFilters) => {
    setFilters({ ...nextFilters, page: 1, limit: filters.limit });
  };

  const handlePageChange = (page) => {
    setFilters((current) => ({ ...current, page }));
  };

  const handleDelete = async () => {
    if (!taskToDelete) return;
    const deleted = await removeTask(taskToDelete._id);
    if (deleted) {
      setTaskToDelete(null);
      refetchStats();
    }
  };

  return (
    <PageWrapper>
      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-neutral-900 bg-neutral-950 p-6 text-white shadow-[0_28px_80px_-46px_rgba(23,23,23,0.9)] sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-300">TaskFlow workspace</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-normal text-white sm:text-5xl">
            Command center for daily execution
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-300">
            Organize tasks, track progress, and keep priorities visible without losing momentum.
          </p>
        </div>
        <Link to="/tasks/new">
          <Button className="w-full bg-amber-400 text-neutral-950 hover:bg-amber-300 sm:w-auto">
            <Plus size={18} aria-hidden="true" />
            Add Task
          </Button>
        </Link>
        </div>
        <div className="mt-8 grid gap-3 border-t border-white/10 pt-5 text-sm text-neutral-300 sm:grid-cols-3">
          <div>
            <span className="block font-semibold text-white">Fast scanning</span>
            <span>Statuses, priorities, and dates are visible at a glance.</span>
          </div>
          <div>
            <span className="block font-semibold text-white">Focused queue</span>
            <span>Search and filters keep the active view tight.</span>
          </div>
          <div>
            <span className="block font-semibold text-white">Clean handoff</span>
            <span>Every task includes enough context for the next action.</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <TaskStats stats={stats} />
        <TaskFilters filters={filters} onChange={updateFilters} searchInputRef={searchInputRef} />
        <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white/70 p-3 shadow-[0_18px_50px_-38px_rgba(23,23,23,0.65)] backdrop-blur dark:border-white/10 dark:bg-white/[0.05] lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">Task view</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Switch between visual cards and a dense operational table.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link
              to="/trash"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white/85 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-neutral-300 hover:bg-white hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-white/10 dark:bg-white/10 dark:text-neutral-200 dark:hover:bg-white/15 dark:hover:text-white"
            >
              <Trash2 size={16} aria-hidden="true" />
              Trash
            </Link>
            <div className="grid grid-cols-2 rounded-xl bg-neutral-100 p-1 dark:bg-white/10">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  viewMode === "grid"
                    ? "bg-white text-neutral-950 shadow-sm dark:bg-neutral-950 dark:text-white"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                }`}
                aria-pressed={viewMode === "grid"}
              >
                <LayoutGrid size={16} aria-hidden="true" />
                Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  viewMode === "table"
                    ? "bg-white text-neutral-950 shadow-sm dark:bg-neutral-950 dark:text-white"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                }`}
                aria-pressed={viewMode === "table"}
              >
                <List size={16} aria-hidden="true" />
                Table
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : tasks.length === 0 ? (
          <EmptyState />
        ) : viewMode === "table" ? (
          <TaskTable tasks={tasks} onDelete={setTaskToDelete} />
        ) : (
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} onDelete={setTaskToDelete} />
            ))}
          </section>
        )}

        {!isLoading && tasks.length > 0 && (
          <TaskPagination pagination={pagination} onPageChange={handlePageChange} />
        )}
      </div>

      <DeleteConfirmModal
        task={taskToDelete}
        isDeleting={isDeleting}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleDelete}
      />
    </PageWrapper>
  );
};

export default Dashboard;
