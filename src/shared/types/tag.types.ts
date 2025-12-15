import { tag, theoryTag } from "@/db/schema";

export type TagSelect = typeof tag.$inferSelect;
export type TagInsert = typeof tag.$inferInsert;

export type TagType = TagSelect["type"];

export type TheoryTagSelect = typeof theoryTag.$inferSelect;
export type TheoryTagInsert = typeof theoryTag.$inferInsert;
