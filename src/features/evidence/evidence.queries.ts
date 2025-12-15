import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { evidence, evidenceVote } from "@/db/schema";

const scoreExpr = sql<number>`COALESCE(SUM(${evidenceVote.weight}), 0)`;

export const evidenceQueries = {
    getByTheory(theoryId: string, side: "PRO" | "CON") {
        return db
            .select({
                id: evidence.id,
                theoryId: evidence.theoryId,
                side: evidence.side,
                content: evidence.content,
                source: evidence.source,
                context: evidence.context,
                status: evidence.status,
                createdAt: evidence.createdAt,
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
