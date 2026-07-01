const Textarea = ({ label, error, className = "", ...props }) => {
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
          {label}
        </span>
      )}
      <textarea
        className={`min-h-32 w-full resize-y rounded-xl border border-neutral-200 bg-white/90 px-3.5 py-2.5 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 dark:border-white/10 dark:bg-white/10 dark:text-neutral-50 dark:placeholder:text-neutral-500 dark:focus:ring-amber-400/15 ${error ? "border-red-300 focus:border-red-500 focus:ring-red-100" : ""} ${className}`}
        {...props}
      />
      {error && <span className="mt-1.5 block text-sm text-red-600">{error}</span>}
    </label>
  );
};

export default Textarea;
