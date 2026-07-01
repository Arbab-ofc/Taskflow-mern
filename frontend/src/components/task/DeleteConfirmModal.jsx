import { AlertTriangle, X } from "lucide-react";
import Button from "../ui/Button";

const DeleteConfirmModal = ({ task, isDeleting, onClose, onConfirm }) => {
  if (!task) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/55 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:border dark:border-white/10 dark:bg-neutral-950">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertTriangle size={22} aria-hidden="true" />
            </span>
            <div>
              <h2 id="delete-title" className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                Move to trash
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                This will move "{task.title}" to Trash. You can restore it later.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:hover:bg-white/10 dark:hover:text-neutral-100"
            aria-label="Close confirmation modal"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? "Moving..." : "Move to trash"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
