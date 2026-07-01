import { CalendarDays, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { PRIORITY_META, STATUS_META } from "../../utils/constants";
import { formatDate } from "../../utils/formatDate";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

const TaskCard = ({ task, onDelete }) => {
  const status = STATUS_META[task.status];
  const priority = PRIORITY_META[task.priority];

  return (
    <article className="group flex min-h-56 flex-col rounded-2xl border border-neutral-200 bg-white/85 p-5 shadow-[0_18px_50px_-38px_rgba(23,23,23,0.7)] backdrop-blur transition duration-200 hover:-translate-y-1 hover:border-neutral-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:hover:border-white/20 dark:hover:bg-white/[0.08]">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge className={status.className}>{status.label}</Badge>
        <Badge className={priority.className}>{priority.label}</Badge>
      </div>
      <Link to={`/tasks/${task._id}`} className="block">
        <h3 className="line-clamp-2 text-lg font-semibold leading-6 text-neutral-950 transition group-hover:text-teal-700 dark:text-neutral-50 dark:group-hover:text-amber-300">
          {task.title}
        </h3>
      </Link>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
        {task.description}
      </p>
      <div className="mt-5 flex items-center gap-2 rounded-xl bg-stone-50 px-3 py-2 text-sm text-neutral-600 dark:bg-white/10 dark:text-neutral-300">
        <CalendarDays size={16} aria-hidden="true" />
        <span>Due {formatDate(task.dueDate)}</span>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-4 dark:border-white/10">
        <Link to={`/tasks/${task._id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            <ExternalLink size={16} aria-hidden="true" />
            View
          </Button>
        </Link>
        <Link to={`/tasks/${task._id}/edit`}>
          <Button variant="ghost" aria-label={`Edit ${task.title}`}>
            <Pencil size={17} aria-hidden="true" />
          </Button>
        </Link>
        <Button variant="ghost" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task)}>
          <Trash2 size={17} aria-hidden="true" />
        </Button>
      </div>
    </article>
  );
};

export default TaskCard;
