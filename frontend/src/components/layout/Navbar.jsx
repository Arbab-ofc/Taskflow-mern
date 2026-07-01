import {
  CheckCircle2,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Plus,
  Sun,
  UserPlus,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../hooks/useTheme";
import Button from "../ui/Button";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
      isActive ? "bg-white text-neutral-950 shadow-sm" : "text-neutral-400 hover:bg-white/10 hover:text-white"
    }`;
  const mobileNavLinkClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
      isActive
        ? "border-amber-300/70 bg-amber-300 text-neutral-950 shadow-[0_18px_40px_-26px_rgba(245,158,11,0.8)]"
        : "border-white/10 bg-white/[0.06] text-neutral-200 hover:border-white/20 hover:bg-white/[0.1] hover:text-white"
    }`;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "TF";

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-950 bg-neutral-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={closeMenu}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-neutral-950 shadow-[0_12px_30px_-18px_rgba(245,158,11,0.8)]">
            <CheckCircle2 size={22} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-bold text-white">TaskFlow</span>
            <span className="hidden truncate text-xs text-neutral-400 sm:block">
              Organize tasks, track progress, and stay productive.
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-2 lg:flex">
          {isAuthenticated ? (
            <>
              <NavLink to="/" className={navLinkClass}>
                <LayoutDashboard size={16} aria-hidden="true" />
                Dashboard
              </NavLink>
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-neutral-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <Sun size={18} aria-hidden="true" />
                ) : (
                  <Moon size={18} aria-hidden="true" />
                )}
              </button>
              <Link to="/tasks/new">
                <Button className="px-3 sm:px-4">
                  <Plus size={17} aria-hidden="true" />
                  <span className="hidden sm:inline">Add Task</span>
                </Button>
              </Link>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 font-semibold text-neutral-950">
                  {initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{user?.name || "Workspace"}</p>
                  <p className="truncate text-xs text-neutral-400">{user?.email}</p>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-neutral-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Log out"
                  title="Log out"
                >
                  <LogOut size={16} aria-hidden="true" />
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-neutral-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <Sun size={18} aria-hidden="true" />
                ) : (
                  <Moon size={18} aria-hidden="true" />
                )}
              </button>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-neutral-300 transition hover:bg-white/10 hover:text-white"
              >
                <LogIn size={16} aria-hidden="true" />
                Login
              </Link>
              <Link to="/signup">
                <Button className="px-3 sm:px-4">
                  <UserPlus size={17} aria-hidden="true" />
                  <span className="hidden sm:inline">Sign up</span>
                </Button>
              </Link>
            </>
          )}
        </nav>
        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-neutral-200 shadow-[0_16px_40px_-28px_rgba(255,255,255,0.35)] transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 lg:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>
      {isMenuOpen && (
        <div id="mobile-navigation" className="lg:hidden">
          <button
            type="button"
            className="fixed inset-0 top-[65px] z-40 cursor-default bg-neutral-950/60 backdrop-blur-sm"
            aria-label="Close navigation menu backdrop"
            onClick={closeMenu}
          />
          <div className="relative z-50 px-3 pb-4 sm:px-6">
            <nav className="mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-950/95 p-3 shadow-[0_28px_80px_-36px_rgba(0,0,0,0.85)] ring-1 ring-white/5">
              <div className="mb-3 rounded-2xl bg-white/[0.06] px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">
                  Navigation
                </p>
                <p className="mt-1 text-sm text-neutral-300">Jump between your workspace views.</p>
              </div>
              <div className="grid gap-2">
                {isAuthenticated ? (
                  <>
                    <NavLink to="/" className={mobileNavLinkClass} onClick={closeMenu}>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-current">
                        <LayoutDashboard size={18} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block">Dashboard</span>
                        <span className="block text-xs font-medium opacity-70">Tasks, filters, stats</span>
                      </span>
                    </NavLink>
                    <button
                      type="button"
                      onClick={() => {
                        toggleTheme();
                        closeMenu();
                      }}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-left text-sm font-semibold text-neutral-200 transition hover:border-white/20 hover:bg-white/[0.1] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-current">
                        {theme === "dark" ? (
                          <Sun size={18} aria-hidden="true" />
                        ) : (
                          <Moon size={18} aria-hidden="true" />
                        )}
                      </span>
                      <span>
                        <span className="block">{theme === "dark" ? "Light mode" : "Dark mode"}</span>
                        <span className="block text-xs font-medium opacity-70">Switch appearance</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-left text-sm font-semibold text-neutral-200 transition hover:border-white/20 hover:bg-white/[0.1] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-current">
                        <LogOut size={18} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block">Log out</span>
                        <span className="block text-xs font-medium opacity-70">{user?.email}</span>
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={closeMenu} className={mobileNavLinkClass}>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-current">
                        <LogIn size={18} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block">Login</span>
                        <span className="block text-xs font-medium opacity-70">Open your workspace</span>
                      </span>
                    </Link>
                    <Link to="/signup" onClick={closeMenu} className={mobileNavLinkClass}>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-current">
                        <UserPlus size={18} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block">Sign up</span>
                        <span className="block text-xs font-medium opacity-70">Create an account</span>
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        toggleTheme();
                        closeMenu();
                      }}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-left text-sm font-semibold text-neutral-200 transition hover:border-white/20 hover:bg-white/[0.1] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-current">
                        {theme === "dark" ? (
                          <Sun size={18} aria-hidden="true" />
                        ) : (
                          <Moon size={18} aria-hidden="true" />
                        )}
                      </span>
                      <span>
                        <span className="block">{theme === "dark" ? "Light mode" : "Dark mode"}</span>
                        <span className="block text-xs font-medium opacity-70">Switch appearance</span>
                      </span>
                    </button>
                  </>
                )}
              </div>
              {isAuthenticated ? (
                <Link to="/tasks/new" onClick={closeMenu} className="mt-3 block">
                  <Button className="w-full justify-center rounded-2xl bg-amber-400 py-3 text-neutral-950 shadow-[0_18px_45px_-28px_rgba(245,158,11,0.9)] hover:bg-amber-300">
                    <Plus size={18} aria-hidden="true" />
                    Add Task
                  </Button>
                </Link>
              ) : (
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <Link to="/login" onClick={closeMenu}>
                    <Button variant="secondary" className="w-full justify-center rounded-2xl py-3">
                      <LogIn size={17} aria-hidden="true" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={closeMenu}>
                    <Button className="w-full justify-center rounded-2xl py-3">
                      <UserPlus size={17} aria-hidden="true" />
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
