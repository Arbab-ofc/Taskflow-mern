export const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

export const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "dueDate", label: "Due date" },
  { value: "priority", label: "Priority" },
];

export const STATUS_META = {
  pending: { label: "Pending", className: "bg-stone-100 text-stone-700 ring-stone-300" },
  "in-progress": { label: "In progress", className: "bg-teal-50 text-teal-700 ring-teal-200" },
  completed: { label: "Completed", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
};

export const PRIORITY_META = {
  low: { label: "Low", className: "bg-stone-100 text-stone-700 ring-stone-300" },
  medium: { label: "Medium", className: "bg-amber-50 text-amber-700 ring-amber-200" },
  high: { label: "High", className: "bg-rose-50 text-rose-700 ring-rose-200" },
};
