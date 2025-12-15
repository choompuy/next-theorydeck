// src/features/theory/theory.actions.ts
"use server";

import { db } from "@/db";
import { theory } from "@/db/schema";
import { slugify } from "@/lib/slugify";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

export type CreateTheoryState = {
    error?: string;
    values?: {
        title?: string;
        tldr?: string;
    };
};

export async function createTheory(_: CreateTheoryState, formData: FormData): Promise<CreateTheoryState> {
    const title = formData.get("title")?.toString().trim();
    const tldr = formData.get("tldr")?.toString().trim();

    if (!title || title.length < 10) {
        return {
            error: "Claim must be at least 10 characters",
            values: { title, tldr },
        };
    }

    if (!tldr || tldr.length < 20) {
        return {
            error: "TL;DR must be at least 20 characters",
            values: { title, tldr },
        };
    }

    const id = randomUUID();
    const slug = slugify(title);

    await db.insert(theory).values({
        id,
        slug,
        title,
        tldr,
        status: "ACTIVE",
    });

    redirect(`/theory/${slug}`);
}
