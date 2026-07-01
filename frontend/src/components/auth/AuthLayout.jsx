import { Link } from "react-router-dom";

const AuthLayout = ({ title, subtitle, children, eyebrow, sideTitle, sideCopy }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between border-b border-white/10 pb-4">
          <Link to="/" className="inline-flex items-center gap-3 transition hover:opacity-90">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 shadow-[0_16px_36px_-24px_rgba(245,158,11,0.75)]">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-950" />
            </span>
            <div>
              <p className="text-sm font-semibold tracking-tight text-white">TaskFlow</p>
              <p className="text-xs text-slate-400">Organize tasks, track progress, and stay productive.</p>
            </div>
          </Link>
          {eyebrow && (
            <p className="hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 sm:block">
              {eyebrow}
            </p>
          )}
        </header>

        <main className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1fr_0.92fr] lg:py-12">
          <section className="max-w-2xl">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Task workspace</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">{subtitle}</p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                "Structured access",
                "Private workspace",
                "Fast return path",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-medium text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.65)]">
              <p className="text-sm font-semibold text-white">{sideTitle}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{sideCopy}</p>
              <div className="mt-5 space-y-3">
                {[
                  "Keep your queue scoped to one login.",
                  "Restore archived work when needed.",
                  "Search and filter without leaving the dashboard.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-200"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-[1.75rem] border border-slate-200 bg-white p-4 text-slate-950 shadow-[0_28px_80px_-44px_rgba(15,23,42,0.8)] sm:p-5 dark:border-white/10 dark:bg-slate-950/80 dark:text-white">
              <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Secure session
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Access your workspace without losing context.
                </p>
              </div>
              {children}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
