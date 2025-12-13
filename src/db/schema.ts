import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/* ---------- THEORY ---------- */

export const theory = sqliteTable("theory", {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    tldr: text("tldr").notNull(),
    status: text("status", {
        enum: ["ACTIVE", "UNDER_REVIEW", "ARCHIVED"],
    })
        .notNull()
        .default("ACTIVE"),

    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(CURRENT_TIMESTAMP)`),
});

/* ---------- TAGS ---------- */

export const tag = sqliteTable("tag", {
    id: text("id").primaryKey(),
    type: text("type", { enum: ["REALM", "TOPIC"] }).notNull(),
    name: text("name").notNull().unique(),
});

export const theoryTag = sqliteTable("theory_tag", {
    theoryId: text("theory_id")
        .notNull()
        .references(() => theory.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
        .notNull()
        .references(() => tag.id, { onDelete: "cascade" }),
});

/* ---------- EVIDENCE ---------- */

export const evidence = sqliteTable("evidence", {
    id: text("id").primaryKey(),

    theoryId: text("theory_id")
        .notNull()
        .references(() => theory.id, { onDelete: "cascade" }),

    side: text("side", { enum: ["PRO", "CON"] }).notNull(),

    content: text("content").notNull(),
    source: text("source"),
    context: text("context"),

    status: text("status", {
        enum: ["PENDING", "APPROVED", "REJECTED"],
    })
        .notNull()
        .default("PENDING"),

    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(CURRENT_TIMESTAMP)`),
});

/* ---------- VOTES ---------- */

export const evidenceVote = sqliteTable("evidence_vote", {
    id: text("id").primaryKey(),

    evidenceId: text("evidence_id")
        .notNull()
        .references(() => evidence.id, { onDelete: "cascade" }),

    weight: integer("weight").notNull(), // 0 / 2 / 5 / 8 / 10
});

/* ---------- COMMENTS ---------- */

export const evidenceComment = sqliteTable("evidence_comment", {
    id: text("id").primaryKey(),

    evidenceId: text("evidence_id")
        .notNull()
        .references(() => evidence.id, { onDelete: "cascade" }),

    content: text("content").notNull(),

    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(CURRENT_TIMESTAMP)`),
});

/* ---------- REPORTS (GUARDRAILS) ---------- */

export const evidenceReport = sqliteTable("evidence_report", {
    id: text("id").primaryKey(),

    evidenceId: text("evidence_id")
        .notNull()
        .references(() => evidence.id, { onDelete: "cascade" }),

    reason: text("reason").notNull(),

    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(CURRENT_TIMESTAMP)`),
});

export const schema = {
    theory,
    evidence,
    evidenceVote,
    evidenceComment,
    evidenceReport,
    tag,
    theoryTag,
};
