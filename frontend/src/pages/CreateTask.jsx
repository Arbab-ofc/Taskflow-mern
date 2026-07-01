import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createTask } from "../api/taskApi";
import PageWrapper from "../components/layout/PageWrapper";
import TaskForm from "../components/task/TaskForm";

const CreateTask = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (payload) => {
    setIsSubmitting(true);
    try {
      await createTask(payload);
      toast.success("Task created successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper className="max-w-4xl">
      <div className="mb-6 rounded-2xl border border-neutral-200 bg-white/85 p-5 shadow-[0_18px_50px_-38px_rgba(23,23,23,0.65)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-[0_18px_50px_-38px_rgba(0,0,0,0.75)] sm:p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-teal-700 dark:text-amber-200">
          New task
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal text-neutral-950 dark:text-slate-50">
          Create task
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 dark:text-slate-300">
          Add the details your team needs to understand ownership, priority, and timing.
        </p>
      </div>
      <TaskForm submitLabel="Create task" onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </PageWrapper>
  );
};

export default CreateTask;
