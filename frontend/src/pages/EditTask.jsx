import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTask, updateTask } from "../api/taskApi";
import PageWrapper from "../components/layout/PageWrapper";
import TaskForm from "../components/task/TaskForm";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import { toInputDate } from "../utils/formatDate";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTask(id);
        setTask(response.data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (payload) => {
    setIsSubmitting(true);
    try {
      await updateTask(id, payload);
      toast.success("Task updated successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const initialValues = task
    ? {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: toInputDate(task.dueDate),
      }
    : null;

  return (
    <PageWrapper className="max-w-4xl">
      <div className="mb-6 rounded-2xl border border-neutral-200 bg-white/85 p-5 shadow-[0_18px_50px_-38px_rgba(23,23,23,0.65)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-[0_18px_50px_-38px_rgba(0,0,0,0.75)] sm:p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-teal-700 dark:text-amber-200">
          Edit task
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal text-neutral-950 dark:text-slate-50">
          Update task
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 dark:text-slate-300">
          Keep status, priority, and due date aligned with the current work plan.
        </p>
      </div>
      {isLoading ? (
        <Loader label="Loading task" />
      ) : task ? (
        <TaskForm
          initialValues={initialValues}
          submitLabel="Update task"
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      ) : (
        <div className="rounded-2xl border border-neutral-200 bg-white/95 p-8 shadow-[0_22px_60px_-42px_rgba(23,23,23,0.72)] dark:border-slate-800 dark:bg-slate-950/80">
          <h2 className="text-lg font-semibold text-neutral-950 dark:text-slate-50">Task not found</h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-slate-400">The task may have been deleted.</p>
          <Link to="/" className="mt-5 inline-flex">
            <Button>Back to dashboard</Button>
          </Link>
        </div>
      )}
    </PageWrapper>
  );
};

export default EditTask;
