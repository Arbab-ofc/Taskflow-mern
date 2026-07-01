import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { PRIORITY_META, STATUS_META } from "../../utils/constants";
import { formatDate } from "../../utils/formatDate";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

const TaskTable = ({ tasks = [], onDelete }) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white/85 shadow-[0_18px_50px_-38px_rgba(23,23,23,0.7)] backdrop-blur dark:border-white/10 dark:bg-white/[0.06]">
      <div className="overflow-x-auto">
        <table className="min-w-[920px] w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-stone-50/80 text-xs uppercase tracking-wide text-neutral-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-400">
            <tr>
              <th className="px-5 py-4 font-semibold">Task</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 font-semibold">Priority</th>
              <th className="px-5 py-4 font-semibold">Due Date</th>
              <th className="px-5 py-4 font-semibold">Created</th>
              <th className="px-5 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-white/10">
            {tasks.map((task) => {
              const status = STATUS_META[task.status];
              const priority = PRIORITY_META[task.priority];

              return (
                <tr
                  key={task._id}
                  className="transition hover:bg-amber-50/45 dark:hover:bg-white/[0.04]"
                >
                  <td className="max-w-md px-5 py-4">
                    <Link
                      to={`/tasks/${task._id}`}
                      className="block font-semibold text-neutral-950 transition hover:text-teal-700 dark:text-neutral-50 dark:hover:text-amber-300"
                    >
                      {task.title}
                    </Link>
                    <p className="mt-1 line-clamp-1 text-neutral-500 dark:text-neutral-400">
                      {task.description}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <Badge className={status.className}>{status.label}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Badge className={priority.className}>{priority.label}</Badge>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-neutral-600 dark:text-neutral-300">
                    {formatDate(task.dueDate)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-neutral-600 dark:text-neutral-300">
                    {formatDate(task.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link to={`/tasks/${task._id}`}>
                        <Button variant="ghost" aria-label={`View ${task.title}`} className="h-9 w-9 px-0">
                          <Eye size={16} aria-hidden="true" />
                        </Button>
                      </Link>
                      <Link to={`/tasks/${task._id}/edit`}>
                        <Button variant="ghost" aria-label={`Edit ${task.title}`} className="h-9 w-9 px-0">
                          <Pencil size={16} aria-hidden="true" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        aria-label={`Delete ${task.title}`}
                        className="h-9 w-9 px-0 text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-500/10"
                        onClick={() => onDelete(task)}
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TaskTable;
