"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function NewTheoryPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    function submit(formData: FormData) {
        setError(null);

        const payload = {
            title: formData.get("title")?.toString().trim(),
            tldr: formData.get("tldr")?.toString().trim(),
            topic: formData.get("topic")?.toString().trim(),
        };

        if (!payload.title || payload.title.length < 10) {
            setError("Title must be at least 10 characters");
            return;
        }

        if (!payload.tldr || payload.tldr.length < 20) {
            setError("TL;DR is too short");
            return;
        }

        startTransition(async () => {
            const res = await fetch("/api/theory", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error ?? "Failed to create theory");
                return;
            }

            const { slug } = await res.json();
            router.push(`/theory/${slug}`);
        });
    }

    return (
        <section className="flex-column gap-m">
            <h1>Create new theory</h1>

            <form className={`${styles.form} flex-column gap-m`} action={submit} style={{ maxWidth: 640 }}>
                <label>
                    Claim
                    <input name="title" placeholder="AI will replace programmers" />
                </label>

                <label>
                    TL;DR
                    <textarea name="tldr" placeholder="Short explanation of what is claimed and why it matters" rows={4} />
                </label>

                {error && <p style={{ color: "tomato" }}>{error}</p>}

                <button disabled={isPending}>{isPending ? "Creating..." : "Create theory"}</button>
            </form>
        </section>
    );
}
