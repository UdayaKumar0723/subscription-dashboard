export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">{eyebrow}</p>
        <h1 className="text-2xl font-semibold text-slate-950 dark:text-white sm:text-3xl">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
