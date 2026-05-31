import { LogOut, Moon, Sun, UserRound } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { authApi } from "../api/auth";
import { useAuthStore } from "../store/authStore";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Plans", to: "/plans" }
];

export default function AppLayout() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const theme = useAuthStore((state) => state.theme);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const toggleTheme = useAuthStore((state) => state.toggleTheme);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } finally {
      clearAuth();
      navigate("/login", { replace: true });
    }
  };

  const links = user?.role === "admin" ? [...navItems, { label: "Admin", to: "/admin/subscriptions" }] : navItems;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <button onClick={() => navigate("/dashboard")} className="text-left">
              <span className="block text-lg font-semibold">Subscription Dashboard</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">Manage plans and account access</span>
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="hidden h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 lg:inline-flex"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="flex min-w-0 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
              <UserRound size={18} className="shrink-0 text-slate-500" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{user?.name}</p>
                <p className="text-xs capitalize text-slate-500 dark:text-slate-400">{user?.role}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-10 items-center gap-2 rounded-md bg-rose-600 px-3 text-sm font-semibold text-white transition hover:bg-rose-700"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
