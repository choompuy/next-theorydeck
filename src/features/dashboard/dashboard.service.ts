import { getDashboardMetrics, getRecentTheories, getMostActiveTheories } from "./dashboard.queries";

export async function getDashboardOverview() {
    const [metrics, recent, active] = await Promise.all([getDashboardMetrics(), getRecentTheories(), getMostActiveTheories()]);

    return {
        metrics,
        recentTheories: recent,
        activeTheories: active,
    };
}
