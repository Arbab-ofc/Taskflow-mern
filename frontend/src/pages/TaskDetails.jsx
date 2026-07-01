import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Pencil,
  Sparkles,
  Trash2,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTask, getTask } from "../api/taskApi";
import PageWrapper from "../components/layout/PageWrapper";
import DeleteConfirmModal from "../components/task/DeleteConfirmModal";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import { PRIORITY_META, STATUS_META } from "../utils/constants";
import { formatDate } from "../utils/formatDate";

const formatActivityDate = (date) => {
  if (!date) return "Not recorded";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Not recorded";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(parsed);
};

const buildActivity = (task) => {
  if (!task) return [];

  const statusEvents = (task.statusHistory || []).map((event) => ({
    type: "status",
    title: event.from ? "Status changed" : "Initial status set",
    description: event.from
      ? `${STATUS_META[event.from]?.label || event.from} to ${STATUS_META[event.to]?.label || event.to}`
      : STATUS_META[event.to]?.label || event.to,
    date: event.changedAt,
  }));

  return [
    {
      type: "created",
      title: "Task created",
      description: "Task was added to the workspace",
      date: task.createdAt,
    },
    ...statusEvents,
    {
      type: "updated",
      title: "Last updated",
      description: "Task details were last saved",
      date: task.updatedAt,
    },
  ].sort((a, b) => new Date(b.date) - new Date(a.date));
};

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTask(id);
        setTask(response.data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTask(id);
      toast.success("Task deleted successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const status = task ? STATUS_META[task.status] : null;
  const priority = task ? PRIORITY_META[task.priority] : null;
  const activity = buildActivity(task);
  const summaryItems = task
    ? [
        {
          label: "Status",
          value: status.label,
          icon: CheckCircle2,
          tone: status.className,
        },
        {
          label: "Priority",
          value: priority.label,
          icon: Sparkles,
          tone: priority.className,
        },
        {
          label: "Due",
          value: formatDate(task.dueDate),
          icon: CalendarDays,
          tone: "bg-white/10 text-white ring-white/10",
        },
        {
          label: "Created",
          value: formatDate(task.createdAt),
          icon: Clock3,
          tone: "bg-white/10 text-white ring-white/10",
        },
      ]
    : [];

  return (
    <PageWrapper className="max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <Link to="/" className="inline-flex">
          <Button variant="secondary">
            <ArrowLeft size={17} aria-hidden="true" />
            Back
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <Loader label="Loading task details" />
      ) : task ? (
        <article className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white/85 shadow-[0_22px_60px_-42px_rgba(23,23,23,0.72)] backdrop-blur dark:border-white/10 dark:bg-white/[0.05]">
          <div className="relative overflow-hidden border-b border-neutral-200 bg-neutral-950 px-6 py-7 text-white dark:border-white/10 sm:px-8 sm:py-9">
            <div className="absolute inset-0 opacity-40">
              <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-amber-400/20 blur-3xl" />
              <div className="absolute right-0 top-10 h-40 w-40 rounded-full bg-teal-400/15 blur-3xl" />
            </div>
            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
              <div className="min-w-0">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge className={status.className}>{status.label}</Badge>
                  <Badge className={priority.className}>{priority.label}</Badge>
                </div>
                <p className="text-sm font-semibold uppercase tracking-wide text-amber-300">
                  Task details
                </p>
                <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-normal text-white sm:text-5xl">
                  {task.title}
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-300 sm:text-base">
                  {task.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {summaryItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                    >
                      <div className="flex items-start gap-3">
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${item.tone}`}>
                          <Icon size={18} aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                            {item.label}
                          </p>
                          <p className="mt-1 break-words text-sm font-semibold text-white">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative mt-7 flex flex-wrap gap-2">
              <Link to={`/tasks/${task._id}/edit`}>
                <Button className="bg-amber-400 text-neutral-950 hover:bg-amber-300">
                  <Pencil size={17} aria-hidden="true" />
                  Edit task
                </Button>
              </Link>
              <Button variant="secondary" onClick={() => setShowDelete(true)} className="border-white/10 bg-white/10 text-white hover:bg-white/15">
                <Trash2 size={17} aria-hidden="true" />
                Move to trash
              </Button>
            </div>
          </div>

          <div className="grid gap-6 px-6 py-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="grid gap-6">
              <section className="rounded-2xl border border-neutral-200 bg-stone-50 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  Description
                </h2>
                <p className="mt-3 whitespace-pre-line text-base leading-8 text-neutral-700 dark:text-neutral-300">
                  {task.description}
                </p>
              </section>

              <section className="rounded-2xl border border-neutral-200 bg-white/80 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                      Activity timeline
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                      Created, updated, and status change history.
                    </p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-neutral-950 dark:bg-amber-300">
                    <Sparkles size={18} aria-hidden="true" />
                  </span>
                </div>

                <div className="mt-5 grid gap-3">
                  {activity.map((event, index) => (
                    <div
                      key={`${event.type}-${event.date}-${index}`}
                      className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.04]"
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-xs font-bold text-white dark:bg-white dark:text-neutral-950">
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <h3 className="font-semibold text-neutral-950 dark:text-neutral-50">
                            {event.title}
                          </h3>
                          <time className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            {formatActivityDate(event.date)}
                          </time>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="grid content-start gap-4 rounded-2xl border border-neutral-200 bg-neutral-950 p-5 text-white shadow-[0_18px_50px_-38px_rgba(23,23,23,0.72)] dark:border-white/10">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-300">
                Task record
              </h2>
              <div className="grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    Due date
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">{formatDate(task.dueDate)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    Created
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">{formatDate(task.createdAt)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    Updated
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">{formatDate(task.updatedAt)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    Status history
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {task.statusHistory?.length || 0} events tracked
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <UserRound size={18} className="mt-0.5 text-amber-300" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                      Ownership
                    </p>
                    <p className="mt-1 text-sm leading-6 text-neutral-300">
                      This task lives in the active workspace and updates are tracked in the activity feed.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </article>
      ) : (
        <div className="rounded-2xl border border-neutral-200 bg-white/85 p-8 shadow-[0_22px_60px_-42px_rgba(23,23,23,0.72)] dark:border-white/10 dark:bg-white/[0.06]">
          <h1 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">Task not found</h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">The task may have been deleted.</p>
        </div>
      )}

      <DeleteConfirmModal
        task={showDelete ? task : null}
        isDeleting={isDeleting}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />
    </PageWrapper>
  );
};

export default TaskDetails;
