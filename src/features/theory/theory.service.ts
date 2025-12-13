import { cache } from "react";
import { theoryRepo } from "./theory.repo";
import { evidenceRepo } from "../evidence/evidence.repo";

function calcConfidence(pro: number, con: number) {
    const total = pro + con;
    if (total === 0) return 0;
    return Math.round((pro / total) * 100);
}

export const theoryService = {
    async getTheoryPage(slug: string) {
        const t = await theoryRepo.getBySlug(slug);
        if (!t) return null;

        const pro = await evidenceRepo.getByTheory(t.id, "PRO");
        const con = await evidenceRepo.getByTheory(t.id, "CON");

        const proScore = pro.reduce((s, e) => s + e.score, 0);
        const conScore = con.reduce((s, e) => s + e.score, 0);

        return {
            id: t.id,
            slug: t.slug,
            title: t.title,
            tldr: t.tldr,
            status: t.status,

            confidence: calcConfidence(proScore, conScore),

            topPro: pro.slice(0, 5),
            topCon: con.slice(0, 5),
        };
    },
};

export const getTheoryPageCached = cache(async (slug: string) => {
    return theoryService.getTheoryPage(slug);
});
