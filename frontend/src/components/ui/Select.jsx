const Select = ({ label, error, options = [], className = "", ...props }) => {
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
          {label}
        </span>
      )}
      <select
        className={`w-full rounded-xl border border-neutral-200 bg-white/90 px-3.5 py-2.5 text-sm text-neutral-950 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-50 dark:focus:ring-amber-400/15 ${error ? "border-red-300 focus:border-red-500 focus:ring-red-100" : ""} ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="mt-1.5 block text-sm text-red-600">{error}</span>}
    </label>
  );
};

export default Select;
