import { Link } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import Button from "../components/ui/Button";

const NotFound = () => {
  return (
    <PageWrapper className="max-w-3xl">
      <div className="rounded-2xl border border-neutral-200 bg-white/85 p-10 text-center shadow-[0_22px_60px_-42px_rgba(23,23,23,0.72)] dark:border-white/10 dark:bg-white/[0.06]">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-amber-300">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal text-neutral-950 dark:text-neutral-50">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-600 dark:text-neutral-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="mt-6 inline-flex">
          <Button>Back to dashboard</Button>
        </Link>
      </div>
    </PageWrapper>
  );
};

export default NotFound;
