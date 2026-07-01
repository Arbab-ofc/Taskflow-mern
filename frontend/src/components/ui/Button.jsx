const variants = {
  primary:
    "bg-neutral-950 text-white shadow-[0_14px_32px_-18px_rgba(23,23,23,0.9)] hover:bg-neutral-800 focus-visible:ring-amber-500 dark:bg-amber-400 dark:text-neutral-950 dark:hover:bg-amber-300",
  secondary:
    "bg-white/85 text-neutral-800 ring-1 ring-neutral-200 hover:bg-white focus-visible:ring-amber-500 dark:bg-white/10 dark:text-neutral-100 dark:ring-white/10 dark:hover:bg-white/15",
  danger:
    "bg-red-600 text-white shadow-[0_14px_32px_-18px_rgba(220,38,38,0.9)] hover:bg-red-700 focus-visible:ring-red-500",
  ghost:
    "bg-transparent text-neutral-600 hover:bg-neutral-100 focus-visible:ring-amber-500 dark:text-neutral-300 dark:hover:bg-white/10",
};

const Button = ({
  children,
  variant = "primary",
  type = "button",
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
