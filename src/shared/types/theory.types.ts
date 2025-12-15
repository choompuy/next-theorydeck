import { theory } from "@/db/schema";

export type TheorySelect = typeof theory.$inferSelect;
export type TheoryInsert = typeof theory.$inferInsert;

export type TheoryStatus = TheorySelect["status"];
