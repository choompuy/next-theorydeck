import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { evidence } from "@/db/schema";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
    const body = await req.json();

    const { theoryId, side, content, source, context } = body;

    if (!theoryId || !side || !content) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    await db.insert(evidence).values({
        id: randomUUID(),
        theoryId,
        side,
        content,
        source,
        context,
        status: "PENDING", // guardrail
    });

    return NextResponse.json({ ok: true });
}
