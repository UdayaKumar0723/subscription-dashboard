import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import Alert from "../components/Alert";
import { authApi } from "../api/auth";
import { getApiError } from "../api/client";
import { useAuthStore } from "../store/authStore";

export default function RegisterPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      const response = await authApi.register(form);
      setAuth(response.data.data);
      navigate("/plans", { replace: true });
    } catch (apiError) {
      setError(getApiError(apiError, "Registration failed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="w-full max-w-md rounded-md border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">Get started</p>
          <h1 className="text-2xl font-semibold">Create your account</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Register as a user and choose a plan.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error ? <Alert>{error}</Alert> : null}
          <Field label="Name" name="name" value={form.name} onChange={handleChange} autoComplete="name" />
          <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" />
          <Field
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            <UserPlus size={18} />
            {isSubmitting ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-400">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-cyan-700 hover:text-cyan-800 dark:text-cyan-300">
            Login
          </Link>
        </p>
      </div>
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
