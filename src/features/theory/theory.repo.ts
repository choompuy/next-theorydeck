import { count, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { evidence, theory } from "@/db/schema";

export const theoryRepo = {
    getAll() {
        return db.query.theory.findMany({
            orderBy: desc(theory.createdAt),
        });
    },

    getBySlug(slug: string) {
        return db.query.theory.findFirst({
            where: eq(theory.slug, slug),
        });
    },

    async getAllWithStats() {
        return db
            .select({
                id: theory.id,
                slug: theory.slug,
                title: theory.title,
                tldr: theory.tldr,
                status: theory.status,
                evidenceCount: count(evidence.id),
            })
            .from(theory)
            .leftJoin(evidence, eq(evidence.theoryId, theory.id))
            .groupBy(theory.id)
            .orderBy(theory.createdAt);
    },
};
