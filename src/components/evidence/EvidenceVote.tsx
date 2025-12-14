"use client";

import { useTransition } from "react";

const WEIGHTS = [0, 2, 5, 8, 10];

export function EvidenceVote({ evidenceId }: { evidenceId: string }) {
    const [isPending, startTransition] = useTransition();

    function vote(weight: number) {
        startTransition(async () => {
            await fetch("/api/evidence/vote", {
                method: "POST",
                body: JSON.stringify({ evidenceId, weight }),
            });
        });
    }

    return (
        <div className="vote">
            {WEIGHTS.map((w) => (
                <button key={w} disabled={isPending} onClick={() => vote(w)}>
                    {w}
                </button>
            ))}
        </div>
    );
}
