import { getTheoryPageCached } from "@/features/theory/theory.service";
import { EvidenceTabs } from "@/components/evidence/EvidenceTabs";
import { ConfidenceBar } from "@/components/theory/ConfidenceBar";

export default async function TheoryPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const data = await getTheoryPageCached(slug);

    if (!data) return <div>Theory not found</div>;

    return (
        <section className="theory-page">
            <header className="theory-header">
                <h1>{data.title}</h1>

                <div className="theory-meta">
                    <span className={`status ${data.status.toLowerCase()}`}>{data.status}</span>
                </div>
            </header>

            <section className="card">
                <h3>TL;DR</h3>
                <p>{data.tldr}</p>
            </section>

            <section className="card">
                <h3>Community confidence</h3>
                <ConfidenceBar value={data.confidence} />
            </section>

            <section className="grid two">
                <section className="card">
                    <h3>Top arguments FOR</h3>
                    {data.topPro.length === 0 && <p className="muted">No supporting evidence yet</p>}
                    {data.topPro.map((e) => (
                        <article key={e.id} className="evidence">
                            <p>{e.content}</p>
                            <small>Score: {e.score}</small>
                        </article>
                    ))}
                </section>

                <section className="card">
                    <h3>Top arguments AGAINST</h3>
                    {data.topCon.length === 0 && <p className="muted">No opposing evidence yet</p>}
                    {data.topCon.map((e) => (
                        <article key={e.id} className="evidence">
                            <p>{e.content}</p>
                            <small>Score: {e.score}</small>
                        </article>
                    ))}
                </section>
            </section>

            <section className="card">
                <div className="evidence-header">
                    <h3>All evidence</h3>
                    <a href={`/evidence/new?theory=${data.slug}`}>Add evidence</a>
                </div>

                <EvidenceTabs pro={data.topPro} con={data.topCon} />
            </section>
        </section>
    );
}
