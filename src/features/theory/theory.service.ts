import { cache } from "react";
import { theoryQueries } from "./theory.queries";
import { evidenceQueries } from "@/features/evidence/evidence.queries";
import { tagQueries } from "../tag/tag.queries";

function calcConfidence(pro: number, con: number) {
    const total = pro + con;
    if (total === 0) return 0;
    return Math.round((pro / total) * 100);
}

export const theoryService = {
    async getAllTheories() {
        return theoryQueries.getAll();
    },

    async getTheoryPage(slug: string) {
        const t = await theoryQueries.getBySlug(slug);
        if (!t) return null;

        const tags = await tagQueries.getByTheory(t.id);

        const allPro = await evidenceQueries.getByTheory(t.id, "PRO");
        const allCon = await evidenceQueries.getByTheory(t.id, "CON");

        const topPro = allPro.slice(0, 5);
        const topCon = allCon.slice(0, 5);

        const proScore = allPro.reduce((s, e) => s + e.score, 0);
        const conScore = allCon.reduce((s, e) => s + e.score, 0);

        return {
            id: t.id,
            slug: t.slug,
            title: t.title,
            tldr: t.tldr,
            status: t.status,
            
            tags,

            confidence: calcConfidence(proScore, conScore),

            topPro,
            topCon,

            allPro,
            allCon,
        };
    },
};

export const getTheoryPageCached = cache(async (slug: string) => {
    return theoryService.getTheoryPage(slug);
});
