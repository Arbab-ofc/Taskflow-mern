import { Save } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../utils/constants";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";

const defaultValues = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  dueDate: "",
};

const validStatuses = STATUS_OPTIONS.map((option) => option.value);
const validPriorities = PRIORITY_OPTIONS.map((option) => option.value);
const titleMinimum = 3;
const descriptionMinimum = 10;

const isValidDateInput = (value) => {
  if (!value) return true;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const [, year, month, day] = match.map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
};

const validate = (values) => {
  const errors = {};
  const dueDate = values.dueDate ? new Date(values.dueDate) : null;

  if (!values.title.trim()) errors.title = "Title is required";
  else if (values.title.trim().length < titleMinimum) {
    errors.title = `Title must be at least ${titleMinimum} characters`;
  }

  if (!values.description.trim()) errors.description = "Description is required";
  else if (values.description.trim().length < descriptionMinimum) {
    errors.description = `Description must be at least ${descriptionMinimum} characters`;
  }

  if (!validStatuses.includes(values.status)) errors.status = "Choose a valid status";
  if (!validPriorities.includes(values.priority)) errors.priority = "Choose a valid priority";
  if (values.dueDate && (Number.isNaN(dueDate.getTime()) || !isValidDateInput(values.dueDate))) {
    errors.dueDate = "Enter a real calendar date in YYYY-MM-DD format, or leave it blank";
  }

  return errors;
};

const TaskForm = ({
  initialValues = defaultValues,
  submitLabel = "Save task",
  onSubmit,
  isSubmitting,
}) => {
  const formInitialValues = { ...defaultValues, ...initialValues };
  const [values, setValues] = useState(formInitialValues);
  const [errors, setErrors] = useState({});
  const titleLength = values.title.trim().length;
  const descriptionLength = values.description.trim().length;

  const handleChange = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleReset = () => {
    setValues(formInitialValues);
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    await onSubmit({
      title: values.title.trim(),
      description: values.description.trim(),
      status: values.status,
      priority: values.priority,
      dueDate: values.dueDate || null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.75rem] border border-neutral-200 bg-white/95 p-5 shadow-[0_22px_60px_-42px_rgba(23,23,23,0.72)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 dark:shadow-[0_22px_60px_-42px_rgba(0,0,0,0.85)] sm:p-8"
    >
      <div className="grid gap-5">
        <Input
          label="Title"
          value={values.title}
          onChange={(event) => handleChange("title", event.target.value)}
          placeholder="Prepare sprint review"
          error={errors.title}
        />
        <p className="-mt-3 text-right text-xs text-neutral-500 dark:text-slate-400">
          {titleLength}/{titleMinimum} minimum
        </p>
        <Textarea
          label="Description"
          value={values.description}
          onChange={(event) => handleChange("description", event.target.value)}
          placeholder="Capture the outcome, next steps, and owner notes."
          error={errors.description}
        />
        <p className="-mt-3 text-right text-xs text-neutral-500 dark:text-slate-400">
          {descriptionLength}/{descriptionMinimum} minimum
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          <Select
            label="Status"
            value={values.status}
            onChange={(event) => handleChange("status", event.target.value)}
            options={STATUS_OPTIONS}
            error={errors.status}
          />
          <Select
            label="Priority"
            value={values.priority}
            onChange={(event) => handleChange("priority", event.target.value)}
            options={PRIORITY_OPTIONS}
            error={errors.priority}
          />
          <Input
            label="Due Date"
            type="date"
            value={values.dueDate}
            onChange={(event) => handleChange("dueDate", event.target.value)}
            error={errors.dueDate}
          />
        </div>
        <p className="-mt-2 text-xs text-neutral-500 dark:text-slate-400">
          Due date is optional. Use the browser date picker or enter a valid calendar date.
        </p>
      </div>
      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          variant="ghost"
          onClick={handleReset}
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          Reset form
        </Button>
        <Link to="/">
          <Button variant="secondary" className="w-full sm:w-auto" disabled={isSubmitting}>
            Cancel
          </Button>
        </Link>
        <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
          <Save size={17} aria-hidden="true" />
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
