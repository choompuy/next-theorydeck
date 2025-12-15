import { evidenceVote } from "@/db/schema";

export type EvidenceVoteSelect = typeof evidenceVote.$inferSelect;
export type EvidenceVoteInsert = typeof evidenceVote.$inferInsert;

export type VoteWeight = EvidenceVoteSelect["weight"];
