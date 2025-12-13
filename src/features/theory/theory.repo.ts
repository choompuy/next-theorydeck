import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { theory } from "@/db/schema";

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
};
