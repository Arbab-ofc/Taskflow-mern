const Loader = ({ label = "Loading tasks" }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label={label}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="h-48 animate-pulse rounded-2xl border border-neutral-200 bg-white/80 p-5 shadow-[0_18px_50px_-38px_rgba(23,23,23,0.65)] dark:border-white/10 dark:bg-white/[0.06]"
        >
          <div className="mb-5 h-4 w-24 rounded bg-neutral-200 dark:bg-white/10" />
          <div className="mb-3 h-5 w-3/4 rounded bg-neutral-200 dark:bg-white/10" />
          <div className="mb-2 h-3 w-full rounded bg-stone-100 dark:bg-white/5" />
          <div className="mb-6 h-3 w-5/6 rounded bg-stone-100 dark:bg-white/5" />
          <div className="h-9 w-full rounded bg-stone-100 dark:bg-white/5" />
        </div>
      ))}
    </div>
  );
};

export default Loader;
