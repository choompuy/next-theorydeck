import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { evidence, evidenceVote } from "@/db/schema";

const scoreExpr = sql<number>`COALESCE(SUM(${evidenceVote.weight}), 0)`;

export const evidenceRepo = {
    getByTheory(theoryId: string, side: "PRO" | "CON") {
        return db
            .select({
                id: evidence.id,
                content: evidence.content,
                side: evidence.side,
                source: evidence.source,
                context: evidence.context,
                score: scoreExpr,
            })
            .from(evidence)
            .leftJoin(evidenceVote, eq(evidence.id, evidenceVote.evidenceId))
            .where(
                sql`${evidence.theoryId} = ${theoryId} 
                    AND ${evidence.side} = ${side}
                    AND ${evidence.status} = 'APPROVED'`
            )
            .groupBy(evidence.id)
            .orderBy(desc(scoreExpr));
    },
};
