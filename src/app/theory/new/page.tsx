"use client";

import Form from "next/form";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import styles from "./page.module.css";
import { createTheory, CreateTheoryState } from "@/features/theory/theory.actions";

const initialState: CreateTheoryState = {};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending}>
            {pending ? "Creating…" : "Create theory"}
        </button>
    );
}

export default function NewTheoryPage() {
    const [state, action] = useActionState(createTheory, initialState);

    return (
        <section className="flex-column gap-m">
            <header>
                <h1>Create theory</h1>
                <p>A theory is a clear claim that can be supported or challenged with evidence.</p>
            </header>

            <Form className={styles.form} action={action}>
                <div className={styles.field}>
                    <label htmlFor="title">Claim</label>
                    <input id="title" name="title" defaultValue={state.values?.title ?? ""} placeholder="AI will replace programmers" />
                    <small>One sentence, assertive and debatable</small>
                </div>

                <div className={styles.field}>
                    <label htmlFor="tldr">TL;DR</label>
                    <textarea
                        id="tldr"
                        name="tldr"
                        rows={4}
                        defaultValue={state.values?.tldr ?? ""}
                        placeholder="Short explanation of what is claimed and why it matters"
                    />
                    <small>Neutral summary without arguments</small>
                </div>

                {state.error && <p className={styles.error}>{state.error}</p>}

                <div className={styles.actions}>
                    <SubmitButton />
                </div>
            </Form>
        </section>
    );
}
