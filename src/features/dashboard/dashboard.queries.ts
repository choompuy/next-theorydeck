import { count, eq, sql, desc } from "drizzle-orm";
import { db } from "@/db";
import { theory, evidence, evidenceReport } from "@/db/schema";

export async function getDashboardMetrics() {
    const [theoriesCount] = await db.select({ value: count() }).from(theory);

    const [evidenceCount] = await db.select({ value: count() }).from(evidence);

    const [reportsCount] = await db.select({ value: count() }).from(evidenceReport);

    return {
        theories: theoriesCount.value,
        evidence: evidenceCount.value,
        reports: reportsCount.value,
    };
}

export async function getRecentTheories(limit = 5) {
    return db
        .select({
            id: theory.id,
            title: theory.title,
            createdAt: theory.createdAt,
            slug: theory.slug,
        })
        .from(theory)
        .orderBy(desc(theory.createdAt))
        .limit(limit);
}

export async function getMostActiveTheories(limit = 5) {
    return db
        .select({
            id: theory.id,
            title: theory.title,
            evidenceCount: count(evidence.id),
            slug: theory.slug,
        })
        .from(theory)
        .leftJoin(evidence, eq(evidence.theoryId, theory.id))
        .groupBy(theory.id)
        .orderBy(desc(sql`count(${evidence.id})`))
        .limit(limit);
}
