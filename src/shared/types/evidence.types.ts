import { evidence } from "@/db/schema";

export type EvidenceSelect = typeof evidence.$inferSelect;
export type EvidenceInsert = typeof evidence.$inferInsert;

export type EvidenceSide = EvidenceSelect["side"];
export type EvidenceStatus = EvidenceSelect["status"];
