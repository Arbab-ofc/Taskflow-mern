import { ArrowRight, LoaderCircle, LogIn } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const from = useMemo(() => location.state?.from?.pathname || "/", [location.state]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [from, isAuthenticated, navigate]);

  const validate = () => {
    const nextErrors = {};
    if (!values.email.trim()) nextErrors.email = "Email is required";
    if (!values.password) nextErrors.password = "Password is required";
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await login(values);
      toast.success("Logged in successfully");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to TaskFlow"
      subtitle="Access your workspace, review open items, and keep task ownership visible."
      sideTitle="Workspace access"
      sideCopy="Use one account to keep your dashboard, details pages, and trash view tied to the same task set."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-amber-400 dark:text-slate-950">
            <LogIn size={18} aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Login</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Use your email and password to continue.
          </p>
        </div>

        <div className="grid gap-4">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
            error={errors.email}
            placeholder="you@company.com"
          />
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            value={values.password}
            onChange={(event) =>
              setValues((current) => ({ ...current, password: event.target.value }))
            }
            error={errors.password}
            placeholder="Enter your password"
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <Button type="submit" className="w-full sm:w-auto" disabled={submitting}>
            {submitting ? <LoaderCircle size={16} className="animate-spin" /> : <ArrowRight size={16} />}
            {submitting ? "Signing in..." : "Sign in"}
          </Button>
          <div className="text-center sm:text-right">
            <p className="text-sm text-slate-500">No account yet?</p>
            <Link
              className="mt-2 inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:border-slate-300 hover:bg-white hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
              to="/signup"
            >
              Create one
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
