import { db } from "@/db";
import { theory } from "@/db/schema";
import { randomUUID } from "crypto";
import { slugify } from "@/lib/slugify";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const title = body.title?.trim();
        const tldr = body.tldr?.trim();

        if (!title || title.length < 10) {
            return Response.json({ error: "Invalid title" }, { status: 400 });
        }

        if (!tldr || tldr.length < 20) {
            return Response.json({ error: "Invalid TL;DR" }, { status: 400 });
        }

        const slug = slugify(title);

        await db
            .insert(theory)
            .values({
                id: randomUUID(),
                slug,
                title,
                tldr,
                status: "ACTIVE",
            })
            .run();

        return Response.json({ slug });
    } catch (e) {
        return Response.json({ error: "Failed to create theory" }, { status: 500 });
    }
}
