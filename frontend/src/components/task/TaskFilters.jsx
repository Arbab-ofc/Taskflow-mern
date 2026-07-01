import { Search } from "lucide-react";
import { PRIORITY_OPTIONS, SORT_OPTIONS, STATUS_OPTIONS } from "../../utils/constants";
import Input from "../ui/Input";
import Select from "../ui/Select";

const TaskFilters = ({ filters, onChange, searchInputRef }) => {
  const updateFilter = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white/80 p-4 shadow-[0_18px_50px_-38px_rgba(23,23,23,0.65)] backdrop-blur dark:border-white/10 dark:bg-white/[0.06]">
      <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_180px]">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500"
            size={18}
            aria-hidden="true"
          />
          <Input
            ref={searchInputRef}
            aria-label="Search tasks"
            placeholder="Search title or description"
            value={filters.search}
            onChange={(event) => updateFilter("search", event.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          aria-label="Filter by status"
          value={filters.status}
          onChange={(event) => updateFilter("status", event.target.value)}
          options={[{ value: "", label: "All statuses" }, ...STATUS_OPTIONS]}
        />
        <Select
          aria-label="Filter by priority"
          value={filters.priority}
          onChange={(event) => updateFilter("priority", event.target.value)}
          options={[{ value: "", label: "All priorities" }, ...PRIORITY_OPTIONS]}
        />
        <Select
          aria-label="Sort tasks"
          value={filters.sort}
          onChange={(event) => updateFilter("sort", event.target.value)}
          options={SORT_OPTIONS}
        />
      </div>
    </section>
  );
};

export default TaskFilters;
