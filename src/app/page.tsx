import Link from "next/link";
import styles from "./page.module.css";
import { getDashboardOverview } from "@/features/dashboard/dashboard.service";
import { BaseCard } from "@/components/ui/BaseCard";

export default async function DashboardPage() {
    const data = await getDashboardOverview();

    return (
        <section className="flex-column gap-m">
            <header>
                <h1>TheoryDeck</h1>
                <p>System state & debate activity</p>
            </header>

            <div className={`${styles["dashboard-grid"]} ${styles.metrics}`}>
                <BaseCard label="Total theories">
                    <span className={styles.metric}>{data.metrics.theories}</span>
                </BaseCard>

                <BaseCard label="Evidence cards">
                    <span className={styles.metric}>{data.metrics.evidence}</span>
                </BaseCard>

                <BaseCard label="Reports">
                    <span className={styles.metric}>{data.metrics.reports}</span>
                </BaseCard>
            </div>

            <div className={`${styles["dashboard-grid"]} ${styles.activity}`}>
                <BaseCard label="Most active theories">
                    <ul className={styles.list}>
                        {data.activeTheories.map((t) => (
                            <li key={t.id}>
                                <Link className={`${styles.link} text-overflow-hidden`} href={`/theory/${t.slug}`}>
                                    {t.title}
                                </Link>
                                <span className="text-muted">{t.evidenceCount} evidence</span>
                            </li>
                        ))}
                    </ul>
                </BaseCard>

                <BaseCard label="Recent theories">
                    <ul className={styles.list}>
                        {data.recentTheories.map((t) => (
                            <li key={t.id}>
                                <Link className={`${styles.link} text-overflow-hidden`} href={`/theory/${t.slug}`}>
                                    {t.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </BaseCard>
            </div>
        </section>
    );
}
