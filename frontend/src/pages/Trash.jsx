import { RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import TaskPagination from "../components/task/TaskPagination";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import Loader from "../components/ui/Loader";
import { useDeletedTasks } from "../hooks/useDeletedTasks";
import { formatDate } from "../utils/formatDate";

const Trash = () => {
  const [filters, setFilters] = useState({ page: 1, limit: 9, sort: "newest" });
  const { tasks, pagination, isLoading, isRestoring, restoreTask } = useDeletedTasks(filters);

  const handlePageChange = (page) => {
    setFilters((current) => ({ ...current, page }));
  };

  return (
    <PageWrapper>
      <div className="mb-8 rounded-[1.75rem] border border-neutral-900 bg-neutral-950 p-6 text-white shadow-[0_28px_80px_-46px_rgba(23,23,23,0.9)] sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-300">
              Trash
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-normal text-white sm:text-4xl">
              Restore deleted tasks
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-300">
              Soft-deleted tasks stay here until you restore them.
            </p>
          </div>
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
            <Trash2 size={22} aria-hidden="true" />
          </span>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : tasks.length === 0 ? (
        <EmptyState
          title="Trash is empty"
          message="Deleted tasks will appear here when you remove them from the dashboard."
          cta={false}
        />
      ) : (
        <div className="grid gap-4">
          <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white/85 shadow-[0_18px_50px_-38px_rgba(23,23,23,0.7)] backdrop-blur dark:border-white/10 dark:bg-white/[0.06]">
            <div className="overflow-x-auto">
              <table className="min-w-[760px] w-full text-left text-sm">
                <thead className="border-b border-neutral-200 bg-stone-50/80 text-xs uppercase tracking-wide text-neutral-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-400">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Task</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Priority</th>
                    <th className="px-5 py-4 font-semibold">Deleted</th>
                    <th className="px-5 py-4 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-white/10">
                  {tasks.map((task) => (
                    <tr key={task._id} className="transition hover:bg-amber-50/45 dark:hover:bg-white/[0.04]">
                      <td className="max-w-md px-5 py-4">
                        <p className="font-semibold text-neutral-950 dark:text-neutral-50">
                          {task.title}
                        </p>
                        <p className="mt-1 line-clamp-1 text-neutral-500 dark:text-neutral-400">
                          {task.description}
                        </p>
                      </td>
                      <td className="px-5 py-4 capitalize text-neutral-600 dark:text-neutral-300">
                        {task.status.replace("-", " ")}
                      </td>
                      <td className="px-5 py-4 capitalize text-neutral-600 dark:text-neutral-300">
                        {task.priority}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-neutral-600 dark:text-neutral-300">
                        {formatDate(task.deletedAt)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Button
                          variant="secondary"
                          onClick={() => restoreTask(task._id)}
                          disabled={isRestoring}
                        >
                          <RotateCcw size={16} aria-hidden="true" />
                          Restore
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <TaskPagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
      )}
    </PageWrapper>
  );
};

export default Trash;
