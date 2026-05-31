import { CalendarDays, CreditCard, PackageCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApiError } from "../api/client";
import { subscriptionApi } from "../api/subscriptions";
import Alert from "../components/Alert";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import { useAuthStore } from "../store/authStore";
import { formatCurrency, formatDate, getStatusTone } from "../utils/format";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSubscription = async () => {
      try {
        const response = await subscriptionApi.getMySubscription();
        setSubscription(response.data.data.subscription);
      } catch (apiError) {
        setError(getApiError(apiError, "Unable to load subscription"));
      } finally {
        setIsLoading(false);
      }
    };

    loadSubscription();
  }, []);

  if (isLoading) {
    return <LoadingState label="Loading dashboard" />;
  }

  const plan = subscription?.planId;

  return (
    <div>
      <PageHeader
        eyebrow="Dashboard"
        title={`Hello, ${user?.name}`}
        description="Track your current plan, subscription period, and account status."
        action={
          <Link
            to="/plans"
            className="inline-flex h-10 items-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            View Plans
          </Link>
        }
      />

      {error ? <Alert>{error}</Alert> : null}

      <section className="mt-5 grid gap-4 lg:grid-cols-3">
        <SummaryCard icon={PackageCheck} label="Subscription Status" value={subscription?.status || "none"} />
        <SummaryCard icon={CreditCard} label="Current Plan" value={plan?.name || "No active plan"} />
        <SummaryCard icon={CalendarDays} label="Ends On" value={subscription ? formatDate(subscription.endDate) : "Not subscribed"} />
      </section>

      <section className="mt-6 rounded-md border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {subscription && plan ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-semibold">{plan.name}</h2>
                <span className={`rounded-md px-2.5 py-1 text-xs font-semibold capitalize ${getStatusTone(subscription.status)}`}>
                  {subscription.status}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Active from {formatDate(subscription.startDate)} to {formatDate(subscription.endDate)}.
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="rounded-md border border-slate-200 px-3 py-2 text-sm dark:border-slate-800">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-md bg-slate-100 p-5 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">Plan price</p>
              <p className="mt-2 text-3xl font-semibold">{formatCurrency(plan.price)}</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{plan.duration} days duration</p>
              <Link
                to="/plans"
                className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-md bg-cyan-700 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800"
              >
                Upgrade or Downgrade
              </Link>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <h2 className="text-xl font-semibold">No active subscription</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
              Choose a plan to activate your account and see the subscription details here.
            </p>
            <Link
              to="/plans"
              className="mt-5 inline-flex h-10 items-center rounded-md bg-cyan-700 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800"
            >
              Browse Plans
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

function SummaryCard({ icon: CardIcon, label, value }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-cyan-100 text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-200">
        <CardIcon size={20} />
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 truncate text-xl font-semibold capitalize">{value}</p>
    </div>
  );
}
