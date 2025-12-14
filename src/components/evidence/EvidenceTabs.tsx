"use client";

import { useState } from "react";

export function EvidenceTabs({ pro, con }: { pro: any[]; con: any[] }) {
    const [tab, setTab] = useState<"PRO" | "CON">("PRO");
    const list = tab === "PRO" ? pro : con;

    return (
        <>
            <div className="tabs">
                <button className={tab === "PRO" ? "active" : ""} onClick={() => setTab("PRO")}>
                    For
                </button>
                <button className={tab === "CON" ? "active" : ""} onClick={() => setTab("CON")}>
                    Against
                </button>
            </div>

            <div className="evidence-list">
                {list.length === 0 && <p className="muted">No evidence yet</p>}

                {list.map((e) => (
                    <article key={e.id} className="evidence">
                        <p>{e.content}</p>
                        <small>Score: {e.score}</small>
                    </article>
                ))}
            </div>
        </>
    );
}
