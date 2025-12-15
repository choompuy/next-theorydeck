import Link from "next/link";
import styles from "./page.module.css";
import { getTheoryPageCached } from "@/features/theory/theory.service";
import { BaseCard } from "@/components/ui/BaseCard";
import { BaseTag } from "@/components/ui/BaseTag";
import { ConfidenceBar } from "@/components/theory/ConfidenceBar";
import { EvidenceCard } from "@/components/evidence/EvidenceCard";
import { EvidenceTabs } from "@/components/evidence/EvidenceTabs";

export default async function TheoryPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const data = await getTheoryPageCached(slug);

    if (!data) return <div>Theory not found</div>;

    const realms = data.tags.filter((t) => t.type === "REALM");
    const topics = data.tags.filter((t) => t.type === "TOPIC");

    return (
        <section className="flex-column gap-m">
            {/* ---------- HEADER ---------- */}
            <header>
                <h1>{data.title}</h1>
            </header>

            <section className={styles.grid}>
                {/* ---------- INFO ---------- */}
                <BaseCard label="Info">
                    <div className="flex-column gap-xs">
                        <div className="flex-row gap-xs">
                            <p>Status:</p>
                            <BaseTag status={data.status} label={data.status} />
                        </div>

                        {realms.length === 0 ? (
                            <p>No realm</p>
                        ) : (
                            <div className="flex-row gap-xs">
                                <p>Realms:</p>
                                {realms.map((t) => (
                                    <BaseTag key={t.id} label={t.name} />
                                ))}
                            </div>
                        )}

                        {topics.length === 0 ? (
                            <p>No topic</p>
                        ) : (
                            <div className="flex-row gap-xs">
                                <p>Topics:</p>
                                {topics.map((t) => (
                                    <BaseTag key={t.id} label={t.name} />
                                ))}
                            </div>
                        )}
                    </div>
                </BaseCard>

                {/* ---------- CONFIDENCE ---------- */}
                <BaseCard label="Community confidence">
                    <ConfidenceBar value={data.confidence} />
                    <small>Not a probability. Calculated from evidence votes.</small>
                </BaseCard>
            </section>

            {/* ---------- TL;DR ---------- */}
            <BaseCard label="TL;DR">
                <span>{data.tldr}</span>
                <small>This theory is under active discussion and evaluated based on submitted evidence.</small>
            </BaseCard>

            {/* ---------- TOP EVIDENCE ---------- */}
            <section className={styles.grid}>
                <div className="flex-column gap-m">
                    <h3>Top arguments (PRO)</h3>

                    <div className="flex-column gap-m">
                        {data.topPro.length === 0 ? (
                            <BaseCard>
                                <p style={{ textAlign: "center" }}>No supporting evidence yet</p>
                            </BaseCard>
                        ) : (
                            data.topPro.map((e) => <EvidenceCard key={e.id} evidence={e} />)
                        )}
                    </div>
                </div>

                <div className="flex-column gap-m">
                    <h3>Top arguments (CON)</h3>

                    <div className="flex-column gap-m">
                        {data.topCon.length === 0 ? (
                            <BaseCard>
                                <p style={{ textAlign: "center" }}>No supporting evidence yet</p>
                            </BaseCard>
                        ) : (
                            data.topCon.map((e) => <EvidenceCard key={e.id} evidence={e} />)
                        )}
                    </div>
                </div>
            </section>

            {/* ---------- ALL EVIDENCE ---------- */}
            <section className="flex-column gap-m">
                <div className="flex-row justify-space-between align-center gap-s">
                    <h3>All evidence</h3>

                    <Link href={`/evidence/new?theory=${data.slug}`} className="btn">
                        Add evidence
                    </Link>
                </div>

                <EvidenceTabs pro={data.allPro} con={data.allCon} />
            </section>
        </section>
    );
}
