import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import PageWrapper from "../components/layout/PageWrapper";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

const highlights = [
  {
    icon: <LayoutGrid size={18} aria-hidden="true" />,
    title: "Structured task views",
    copy: "Switch between compact cards and a dense table without losing context.",
  },
  {
    icon: <ShieldCheck size={18} aria-hidden="true" />,
    title: "Protected workspaces",
    copy: "Each account keeps its own tasks, trash, and stats isolated from everyone else.",
  },
  {
    icon: <Clock3 size={18} aria-hidden="true" />,
    title: "Fast status updates",
    copy: "Search, filters, and sort controls are designed for quick daily scanning.",
  },
];

const activityItems = [
  {
    title: "Design review",
    detail: "Moved to in-progress",
    meta: "Updated 12 min ago",
    tone: "bg-cyan-400",
  },
  {
    title: "Release checklist",
    detail: "Due tomorrow",
    meta: "Waiting on approval",
    tone: "bg-amber-400",
  },
  {
    title: "Bug triage",
    detail: "Completed today",
    meta: "Closed by Sara",
    tone: "bg-emerald-400",
  },
];

const PublicHome = () => {
  return (
    <PageWrapper className="space-y-12">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
            <Sparkles size={14} aria-hidden="true" />
            TaskFlow
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Organize tasks, track progress, and stay productive.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Keep every task visible, move work forward faster, and stay in control with a workspace built
            for clear ownership and quick decisions.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/signup">
              <Button className="w-full justify-center sm:w-auto">
                Create account
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" className="w-full justify-center sm:w-auto">
                Sign in
              </Button>
            </Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-sm font-semibold text-slate-950 dark:text-white">Fast setup</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Account ready in seconds.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-sm font-semibold text-slate-950 dark:text-white">Private data</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Tasks stay tied to your login.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-sm font-semibold text-slate-950 dark:text-white">Clean workflow</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Search, sort, and restore with ease.</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Workroom snapshot
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                A quiet glance at the current queue and movement.
              </p>
            </div>
            <Badge className="border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
              Live
            </Badge>
          </div>

          <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="border-b border-slate-200 p-5 dark:border-white/10 lg:border-b-0 lg:border-r">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950/50">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Pending
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">12</p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Waiting on next action</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950/50">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Due soon
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">05</p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Next 48 hours</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950/50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">Work load</p>
                  <Badge className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300">
                    Balanced
                  </Badge>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    { label: "Planning", value: 62 },
                    { label: "Execution", value: 48 },
                    { label: "Review", value: 26 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 dark:bg-white/10">
                        <div
                          className="h-2 rounded-full bg-slate-950 dark:bg-amber-400"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950/50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">Recent activity</p>
                  <CheckCircle2 size={16} className="text-emerald-500" aria-hidden="true" />
                </div>
                <div className="mt-4 space-y-4">
                  {activityItems.map((item, index) => (
                    <div key={item.title} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className={`mt-1 h-2.5 w-2.5 rounded-full ${item.tone}`} />
                        {index < activityItems.length - 1 && (
                          <span className="mt-2 h-full w-px bg-slate-200 dark:bg-white/10" />
                        )}
                      </div>
                      <div className="min-w-0 pb-4">
                        <p className="text-sm font-semibold text-slate-950 dark:text-white">{item.title}</p>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.detail}</p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950/50">
                <p className="text-sm font-semibold text-slate-950 dark:text-white">Shortcut</p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Use the task list, timeline, and trash together to keep the queue organized without losing context.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="rounded-[1.5rem] border border-slate-200 bg-white/85 p-5 dark:border-white/10 dark:bg-white/[0.04]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
              {item.icon}
            </div>
            <h2 className="mt-4 text-base font-semibold text-slate-950 dark:text-white">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.copy}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-950 px-6 py-6 text-white dark:border-white/10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Ready to start</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Create your workspace and keep task flow simple.</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Sign up for a private workspace, or sign in to continue where you left off.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/signup">
            <Button className="w-full justify-center bg-amber-400 text-slate-950 hover:bg-amber-300 sm:w-auto">
              Sign up now
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" className="w-full justify-center sm:w-auto">
              Login
            </Button>
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
};

const Home = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <PageWrapper>
        <div className="py-8">
          <div className="h-8 w-52 animate-pulse rounded-xl bg-slate-200 dark:bg-white/10" />
          <div className="mt-4 h-4 w-80 animate-pulse rounded-xl bg-slate-200 dark:bg-white/10" />
        </div>
      </PageWrapper>
    );
  }

  return isAuthenticated ? <Dashboard /> : <PublicHome />;
};

export default Home;
