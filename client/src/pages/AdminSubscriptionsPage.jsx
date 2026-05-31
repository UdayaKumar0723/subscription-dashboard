import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { getApiError } from "../api/client";
import { subscriptionApi } from "../api/subscriptions";
import Alert from "../components/Alert";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import { formatCurrency, formatDate, getStatusTone } from "../utils/format";

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadSubscriptions = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await subscriptionApi.getAllSubscriptions();
      setSubscriptions(response.data.data.subscriptions);
    } catch (apiError) {
      setError(getApiError(apiError, "Unable to load subscriptions"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSubscriptions();
  }, []);

  if (isLoading) {
    return <LoadingState label="Loading subscriptions" />;
  }

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="All subscriptions"
        description="Review user subscriptions across active, expired, and replaced plans."
        action={
          <button
            type="button"
            onClick={loadSubscriptions}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        }
      />

      {error ? <Alert>{error}</Alert> : null}

      <div className="mt-5 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
            <thead className="bg-slate-100 text-left text-xs uppercase text-slate-500 dark:bg-slate-950 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Start</th>
                <th className="px-4 py-3">End</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {subscriptions.map((subscription) => (
                <tr key={subscription._id} className="hover:bg-slate-50 dark:hover:bg-slate-950/70">
                  <td className="px-4 py-3">
                    <p className="font-medium">{subscription.userId?.name || "Unknown user"}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{subscription.userId?.email}</p>
                  </td>
                  <td className="px-4 py-3 font-medium">{subscription.planId?.name || "Unknown plan"}</td>
                  <td className="px-4 py-3">{formatCurrency(subscription.planId?.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-md px-2 py-1 text-xs font-semibold capitalize ${getStatusTone(subscription.status)}`}>
                      {subscription.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{formatDate(subscription.startDate)}</td>
                  <td className="px-4 py-3">{formatDate(subscription.endDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!subscriptions.length ? (
          <div className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">No subscriptions found.</div>
        ) : null}
      </div>
    </div>
  );
}
