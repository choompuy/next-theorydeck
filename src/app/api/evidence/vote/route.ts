import { db } from "@/db";
import { evidenceVote } from "@/db/schema";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
    const { evidenceId, weight } = await req.json();

    await db.insert(evidenceVote).values({
        id: randomUUID(),
        evidenceId,
        weight,
    });

    return Response.json({ ok: true });
}
