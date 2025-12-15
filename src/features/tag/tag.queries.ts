import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tag, theoryTag } from "@/db/schema";

export const tagQueries = {
    getByTheory(theoryId: string) {
        return db
            .select({
                id: tag.id,
                type: tag.type,
                name: tag.name,
            })
            .from(theoryTag)
            .innerJoin(tag, eq(tag.id, theoryTag.tagId))
            .where(eq(theoryTag.theoryId, theoryId));
    },
};
