export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount || 0);

export const formatDate = (date) => {
  if (!date) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
};

export const getStatusTone = (status) => {
  if (status === "active") return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300";
  if (status === "expired") return "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300";
  return "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200";
};
