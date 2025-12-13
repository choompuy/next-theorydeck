import Link from "next/link";
import styles from "./page.module.css";
import { theoryRepo } from "@/features/theory/theory.repo";

export default async function TheoryListPage() {
    const theories = await theoryRepo.getAll();

    return (
        <main className={styles.main}>
            <h1>Theories</h1>

            <div className={styles.theories}>
                {theories.map((t) => (
                    <div key={t.id}>
                        <Link href={`/theory/${t.slug}`}>
                            <strong>{t.title}</strong>
                        </Link>
                        <p>{t.tldr}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
