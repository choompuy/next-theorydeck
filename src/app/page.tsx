import Link from "next/link";
import styles from "./page.module.css";
import { getDashboardOverview } from "@/features/dashboard/dashboard.service";
import { BaseCard } from "@/components/ui/card/BaseCard";
import { BaseCardHeader } from "@/components/ui/card/BaseCardHeader";
import { BaseCardContent } from "@/components/ui/card/BaseCardContent";

export default async function DashboardPage() {
    const data = await getDashboardOverview();

    return (
        <section className="flex-column gap-m">
            <header>
                <h1>TheoryDeck</h1>
                <p>System state & debate activity</p>
            </header>

            <div className={`${styles["dashboard-grid"]} ${styles.metrics}`}>
                <BaseCard>
                    <BaseCardHeader>Total theories</BaseCardHeader>
                    <BaseCardContent>
                        <span className={styles.metric}>{data.metrics.theories}</span>
                    </BaseCardContent>
                </BaseCard>

                <BaseCard>
                    <BaseCardHeader>Evidence cards</BaseCardHeader>
                    <BaseCardContent>
                        <span className={styles.metric}>{data.metrics.evidence}</span>
                    </BaseCardContent>
                </BaseCard>

                <BaseCard>
                    <BaseCardHeader>Reports</BaseCardHeader>
                    <BaseCardContent>
                        <span className={styles.metric}>{data.metrics.reports}</span>
                    </BaseCardContent>
                </BaseCard>
            </div>

            <div className={`${styles["dashboard-grid"]} ${styles.activity}`}>
                <BaseCard>
                    <BaseCardHeader>Most active theories</BaseCardHeader>
                    <BaseCardContent>
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
                    </BaseCardContent>
                </BaseCard>

                <BaseCard>
                    <BaseCardHeader>Recent theories</BaseCardHeader>
                    <BaseCardContent>
                        <ul className={styles.list}>
                            {data.recentTheories.map((t) => (
                                <li key={t.id}>
                                    <Link className={`${styles.link} text-overflow-hidden`} href={`/theory/${t.slug}`}>
                                        {t.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </BaseCardContent>
                </BaseCard>
            </div>
        </section>
    );
}
