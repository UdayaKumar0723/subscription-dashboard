import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import Alert from "../components/Alert";
import { authApi } from "../api/auth";
import { getApiError } from "../api/client";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await authApi.login(form);
      setAuth(response.data.data);
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
    } catch (apiError) {
      setError(getApiError(apiError, "Login failed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to view your subscription workspace">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error ? <Alert>{error}</Alert> : null}
        <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" />
        <Field
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
        >
          <LogIn size={18} />
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-400">
        New here?{" "}
        <Link to="/register" className="font-semibold text-cyan-700 hover:text-cyan-800 dark:text-cyan-300">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}

function AuthShell({ title, subtitle, children }) {
  return (
    <main className="grid min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white lg:grid-cols-[1fr_460px]">
      <section className="hidden bg-[url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center lg:block">
        <div className="flex h-full items-end bg-slate-950/55 p-10">
          <div className="max-w-xl text-white">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-200">SaaS Admin</p>
            <h1 className="text-4xl font-semibold">Subscription Management Dashboard</h1>
            <p className="mt-4 text-slate-200">A focused workspace for plans, active subscriptions, and admin visibility.</p>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-md border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">Account</p>
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
      <input
        {...props}
        required
        className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
      />
    </label>
  );
}
