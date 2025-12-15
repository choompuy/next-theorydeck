import Link from "next/link";
import styles from "./page.module.css";
import { theoryService } from "@/features/theory/theory.service";
import { BaseCard } from "@/components/ui/BaseCard";
import { BaseTag } from "@/components/ui/BaseTag";

export default async function TheoryListPage() {
    const theories = await theoryService.getAllTheories();

    return (
        <section className="flex-column gap-m">
            <header>
                <h1>Theories</h1>
                <p>Structured claims with supporting and opposing evidence</p>
            </header>

            <div className={styles.grid}>
                {theories.map((t) => (
                    <Link key={t.id} className={styles["card-wrapper"]} href={`/theory/${t.slug}`}>
                        <BaseCard className="w-full h-full">
                            <div className={`${styles["card-header"]} flex-row w-full`}>
                                <span className={`${styles.title} text-overflow-hidden`}>{t.title}</span>
                                <BaseTag status={t.status} label={t.status} />
                            </div>

                            <span className={styles.tldr}>{t.tldr}</span>
                        </BaseCard>
                    </Link>
                ))}
            </div>
        </section>
    );
}
