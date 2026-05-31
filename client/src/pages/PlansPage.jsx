import { Check, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { getApiError } from "../api/client";
import { subscriptionApi } from "../api/subscriptions";
import Alert from "../components/Alert";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import { formatCurrency } from "../utils/format";

export default function PlansPage() {
  const [plans, setPlans] = useState([]);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [subscribingPlanId, setSubscribingPlanId] = useState("");

  const loadData = async () => {
    setError("");
    setIsLoading(true);

    try {
      const [plansResponse, subscriptionResponse] = await Promise.all([
        subscriptionApi.getPlans(),
        subscriptionApi.getMySubscription()
      ]);
      setPlans(plansResponse.data.data.plans);
      setActiveSubscription(subscriptionResponse.data.data.subscription);
    } catch (apiError) {
      setError(getApiError(apiError, "Unable to load plans"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubscribe = async (planId) => {
    setError("");
    setSuccess("");
    setSubscribingPlanId(planId);

    try {
      await subscriptionApi.subscribe(planId);
      setSuccess("Subscription updated successfully");
      await loadData();
    } catch (apiError) {
      setError(getApiError(apiError, "Unable to subscribe"));
    } finally {
      setSubscribingPlanId("");
    }
  };

  if (isLoading) {
    return <LoadingState label="Loading plans" />;
  }

  const activePlanId = activeSubscription?.planId?._id;

  return (
    <div>
      <PageHeader
        eyebrow="Plans"
        title="Choose the plan that fits today"
        description="Subscribing to a new plan expires the current active subscription and starts the selected one."
        action={
          <button
            type="button"
            onClick={loadData}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        }
      />

      <div className="mb-5 space-y-3">
        {error ? <Alert>{error}</Alert> : null}
        {success ? <Alert type="success">{success}</Alert> : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => {
          const isActive = activePlanId === plan._id;

          return (
            <article
              key={plan._id}
              className={`flex min-h-[360px] flex-col rounded-md border bg-white p-5 shadow-sm transition dark:bg-slate-900 ${
                isActive ? "border-cyan-500 ring-2 ring-cyan-500/20" : "border-slate-200 dark:border-slate-800"
              }`}
            >
              <div className="mb-4">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-semibold">{plan.name}</h2>
                  {isActive ? (
                    <span className="rounded-md bg-cyan-100 px-2 py-1 text-xs font-semibold text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-200">
                      Active
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-3xl font-semibold">{formatCurrency(plan.price)}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{plan.duration} days access</p>
              </div>

              <ul className="mb-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Check size={17} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                disabled={subscribingPlanId === plan._id}
                onClick={() => handleSubscribe(plan._id)}
                className={`mt-auto h-10 rounded-md px-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${
                  isActive
                    ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                    : "bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                }`}
              >
                {subscribingPlanId === plan._id ? "Updating..." : isActive ? "Renew current plan" : "Subscribe"}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
