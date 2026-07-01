import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../ui/Button";

const TaskPagination = ({ pagination, onPageChange }) => {
  const { page, pages, total, limit } = pagination;
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  if (total === 0) return null;

  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white/70 p-3 shadow-[0_18px_50px_-38px_rgba(23,23,23,0.65)] backdrop-blur dark:border-white/10 dark:bg-white/[0.05] sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Showing <span className="font-semibold text-neutral-950 dark:text-neutral-50">{start}</span>
        {" - "}
        <span className="font-semibold text-neutral-950 dark:text-neutral-50">{end}</span>
        {" of "}
        <span className="font-semibold text-neutral-950 dark:text-neutral-50">{total}</span> tasks
      </p>
      <div className="flex items-center justify-between gap-2 sm:justify-end">
        <Button
          variant="secondary"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="px-3"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          Previous
        </Button>
        <span className="min-w-20 text-center text-sm font-semibold text-neutral-700 dark:text-neutral-200">
          {page} / {pages}
        </span>
        <Button
          variant="secondary"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pages}
          className="px-3"
        >
          Next
          <ChevronRight size={16} aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
};

export default TaskPagination;
