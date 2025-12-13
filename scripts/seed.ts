import { randomUUID } from "crypto";
import { db } from "@/db";
import { theory, evidence, evidenceVote, evidenceComment, evidenceReport, theoryTag, tag } from "@/db/schema";

const theoryAI: typeof theory.$inferInsert = {
    id: id(),
    slug: "ai-will-replace-programmers",
    title: "AI заменит программистов",
    status: "ACTIVE",
    tldr:
        "Считается, что развитие ИИ приведёт к исчезновению профессии программиста. " +
        "Обсуждение фокусируется на автоматизации, ответственности и роли человека.",
};

const theoryClimate: typeof theory.$inferInsert = {
    id: id(),
    slug: "climate-change-is-accelerating",
    title: "Изменение климата ускоряется",
    status: "ACTIVE",
    tldr: "Теория утверждает, что темпы климатических изменений увеличиваются. " + "Спор идёт вокруг интерпретации данных и долгосрочных моделей.",
};

const evidenceListAI: (typeof evidence.$inferInsert)[] = [
    {
        id: id(),
        theoryId: theoryAI.id,
        side: "PRO",
        content: "LLM уже пишут код быстрее junior-разработчиков в типовых задачах.",
        source: "https://arxiv.org/abs/2303.08774",
        context: "Сравнение скорости и качества решений",
        status: "APPROVED",
    },
    {
        id: id(),
        theoryId: theoryAI.id,
        side: "PRO",
        content: "Компании сокращают начальные позиции, заменяя их Copilot-подходами.",
        source: "https://www.businessinsider.com/",
        context: "Рынок труда",
        status: "APPROVED",
    },
    {
        id: id(),
        theoryId: theoryAI.id,
        side: "CON",
        content: "Архитектурные решения и ответственность остаются на человеке.",
        source: null,
        context: "Практика enterprise-разработки",
        status: "APPROVED",
    },
    {
        id: id(),
        theoryId: theoryAI.id,
        side: "CON",
        content: "ИИ не понимает бизнес-контекст и юридические риски.",
        source: null,
        context: "Ответственность и доменная экспертиза",
        status: "APPROVED",
    },
];

const evidenceListClimate: (typeof evidence.$inferInsert)[] = [
    {
        id: id(),
        theoryId: theoryClimate.id,
        side: "PRO",
        content: "Температурные аномалии растут быстрее прогнозов 2000-х.",
        source: "https://climate.nasa.gov/",
        context: "Сравнение исторических моделей",
        status: "APPROVED",
    },
    {
        id: id(),
        theoryId: theoryClimate.id,
        side: "CON",
        content: "Часть трендов укладывается в естественные циклы.",
        source: null,
        context: "Долгосрочные климатические колебания",
        status: "PENDING",
    },
];

const voteWeights: (typeof evidenceVote.$inferInsert.weight)[] = [0, 2, 5, 8, 10];

function id() {
    return randomUUID();
}

/* ---------- TAGS ---------- */

const tags: (typeof tag.$inferInsert)[] = [
    { id: id(), type: "REALM", name: "Technology" },
    { id: id(), type: "REALM", name: "Science" },
    { id: id(), type: "TOPIC", name: "AI" },
    { id: id(), type: "TOPIC", name: "Programming" },
    { id: id(), type: "TOPIC", name: "Climate" },
];

db.insert(tag).values(tags).run();

/* ---------- THEORY #1 ---------- */

db.insert(theory).values(theoryAI).run();
db.insert(theoryTag)
    .values([
        { theoryId: theoryAI.id, tagId: tags.find((t) => t.name === "Technology")!.id },
        { theoryId: theoryAI.id, tagId: tags.find((t) => t.name === "AI")!.id },
        { theoryId: theoryAI.id, tagId: tags.find((t) => t.name === "Programming")!.id },
    ])
    .run();

/* ---------- THEORY #2 ---------- */

db.insert(theory).values(theoryClimate).run();
db.insert(theoryTag)
    .values([
        { theoryId: theoryClimate.id, tagId: tags.find((t) => t.name === "Science")!.id },
        { theoryId: theoryClimate.id, tagId: tags.find((t) => t.name === "Climate")!.id },
    ])
    .run();

/* ---------- EVIDENCE (PRO / CON) ---------- */

db.insert(evidence).values(evidenceListAI).run();
db.insert(evidence).values(evidenceListClimate).run();

/* ---------- VOTES ---------- */

db.insert(evidenceVote)
    .values(
        evidenceListAI.flatMap((ev) =>
            voteWeights.map((weight) => ({
                id: id(),
                evidenceId: ev.id,
                weight,
            }))
        )
    )
    .run();

/* ---------- COMMENTS ---------- */

db.insert(evidenceComment)
    .values([
        {
            id: id(),
            evidenceId: evidenceListAI[0].id,
            content: "Это уже видно на собеседованиях.",
        },
        {
            id: id(),
            evidenceId: evidenceListAI[2].id,
            content: "Без человека система не масштабируется.",
        },
    ])
    .run();

/* ---------- REPORTS (GUARDRAILS) ---------- */

db.insert(evidenceReport)
    .values([
        {
            id: id(),
            evidenceId: evidenceListAI[1].id,
            reason: "Clickbait / weak source",
        },
    ])
    .run();

console.log("Seed completed");
