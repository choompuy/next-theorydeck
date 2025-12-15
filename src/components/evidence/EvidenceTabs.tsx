"use client";

import { useState } from "react";
import styles from "./EvidenceTabs.module.css";
import { EvidenceSelect, EvidenceSide } from "@/shared/types/evidence.types";
import { BaseButton } from "../ui/BaseButton";
import { EvidenceCard } from "./EvidenceCard";
import { BaseCard } from "../ui/BaseCard";

interface EvidenceItem extends EvidenceSelect {
    score: number;
}

interface Props {
    pro: EvidenceItem[];
    con: EvidenceItem[];
}

export function EvidenceTabs({ pro, con }: Props) {
    const [tab, setTab] = useState<EvidenceSide>("PRO");
    const list = tab === "PRO" ? pro : con;

    return (
        <div className={`${styles.wrapper} flex-column gap-m`}>
            <div className="flex-row gap-xs">
                <BaseButton variant="secondary" isActive={tab === "PRO"} onClick={() => setTab("PRO")}>
                    For ({pro.length})
                </BaseButton>

                <BaseButton variant="secondary" isActive={tab === "CON"} onClick={() => setTab("CON")}>
                    Against ({con.length})
                </BaseButton>
            </div>

            <div className="flex-column gap-m">
                {list.length === 0 ? (
                    <BaseCard>
                        <p style={{ textAlign: "center" }}>No evidence yet</p>
                    </BaseCard>
                ) : (
                    list.map((e) => <EvidenceCard key={e.id} evidence={e} />)
                )}
            </div>
        </div>
    );
}
