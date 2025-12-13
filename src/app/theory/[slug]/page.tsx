import styles from "./page.module.css";
import { getTheoryPageCached } from "@/features/theory/theory.service";

export default async function TheoryPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const data = await getTheoryPageCached(slug);

    if (!data) return <div>Theory not found</div>;

    return (
        <main className={styles.main}>
            <h1>{data.title}</h1>
            <p>{data.tldr}</p>

            <div>
                <strong>Community confidence:</strong> {data.confidence}%
            </div>

            <section className={styles.section}>
                <h2>Top arguments FOR</h2>
                <div className="arguments">
                    {data.topPro.map((e) => (
                        <div key={e.id}>
                            <p>{e.content}</p>
                            <small>Score: {e.score}</small>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <h2>Top arguments AGAINST</h2>
                <div className="arguments">
                    {data.topCon.map((e) => (
                        <div key={e.id}>
                            <p>{e.content}</p>
                            <small>Score: {e.score}</small>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
