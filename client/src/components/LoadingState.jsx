export default function LoadingState({ label = "Loading" }) {
  return (
    <div className="flex min-h-48 items-center justify-center rounded-md border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-cyan-600" />
      <span className="ml-3 text-sm text-slate-600 dark:text-slate-300">{label}</span>
    </div>
  );
}
