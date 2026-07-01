import { CheckCircle2, Clock3, ListTodo, TimerReset } from "lucide-react";

const statsConfig = [
  { key: "total", label: "Total Tasks", icon: ListTodo, accent: "bg-neutral-950 text-white" },
  { key: "pending", label: "Pending Tasks", icon: Clock3, accent: "bg-stone-200 text-stone-800" },
  { key: "inProgress", label: "In Progress Tasks", icon: TimerReset, accent: "bg-teal-100 text-teal-800" },
  { key: "completed", label: "Completed Tasks", icon: CheckCircle2, accent: "bg-emerald-100 text-emerald-800" },
];

const TaskStats = ({ stats }) => {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statsConfig.map(({ key, label, icon: Icon, accent }) => (
        <div
          key={key}
          className="rounded-2xl border border-neutral-200 bg-white/80 p-5 shadow-[0_18px_50px_-38px_rgba(23,23,23,0.65)] backdrop-blur transition hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:hover:border-white/20 dark:hover:bg-white/[0.08]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{label}</p>
              <p className="mt-2 text-3xl font-bold tracking-normal text-neutral-950 dark:text-neutral-50">
                {stats[key]}
              </p>
            </div>
            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}>
              <Icon size={22} aria-hidden="true" />
            </span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TaskStats;
