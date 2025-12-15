import Link from "next/link";
import { EvidenceSelect } from "@/shared/types/evidence.types";
import { BaseCard } from "@/components/ui/BaseCard";

interface EvidenceItem extends EvidenceSelect {
    score: number;
}

interface Props {
    evidence: EvidenceItem;
}

export function EvidenceCard(props: Props) {
    return (
        <BaseCard>
            <article key={props.evidence.id} className="flex-column gap-xs">
                <span className="flex-row gap-xxs">
                    <p>Score:</p> {props.evidence.score}
                </span>

                <span>{props.evidence.content}</span>

                {props.evidence.source && (
                    <small>
                        <Link href={props.evidence.source} target="_blank" className="evidence-source">
                            Source
                        </Link>
                    </small>
                )}
            </article>
        </BaseCard>
    );
}
