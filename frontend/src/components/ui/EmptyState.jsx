import { ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./Button";

const EmptyState = ({
  title = "No tasks found",
  message = "Create your first task or adjust your filters to see more results.",
  cta = true,
}) => {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-neutral-300 bg-white/80 px-6 py-14 text-center shadow-[0_18px_50px_-38px_rgba(23,23,23,0.65)] backdrop-blur dark:border-white/15 dark:bg-white/[0.06]">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-neutral-950">
        <ClipboardList size={24} aria-hidden="true" />
      </div>
      <h2 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-600 dark:text-neutral-400">{message}</p>
      {cta && (
        <Link to="/tasks/new" className="mt-6 inline-flex">
          <Button>Create task</Button>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
