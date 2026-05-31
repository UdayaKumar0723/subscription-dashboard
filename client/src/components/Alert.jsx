export default function Alert({ type = "error", children }) {
  const tone =
    type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200"
      : "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200";

  return <div className={`rounded-md border px-4 py-3 text-sm ${tone}`}>{children}</div>;
}
