import { eq } from "drizzle-orm";
import { db } from "@/db";
import { evidence } from "@/db/schema";

export default async function ModerationPage() {
    const pending = await db.select().from(evidence).where(eq(evidence.status, "PENDING"));

    return (
        <section>
            <h1>Moderation</h1>

            {pending.length === 0 && <p>No pending evidence</p>}

            {pending.map((e) => (
                <div key={e.id} className="card">
                    <p>{e.content}</p>
                    <small>{e.side}</small>
                </div>
            ))}
        </section>
    );
}
