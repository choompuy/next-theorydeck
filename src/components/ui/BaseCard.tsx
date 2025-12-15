import { ReactNode } from "react";
import styles from "./BaseCard.module.css";

interface Props {
    children: ReactNode;
    label?: string;
    className?: string;
}

export function BaseCard(props: Props) {
    return (
        <div className={`${styles.card} ${props.className || ""} flex-column gap-m`}>
            {props.label && <span className={`${styles["card-header"]} text-muted`}>{props.label}</span>}
            <div className={`${styles["card-content"]} flex-column gap-m`}>{props.children}</div>
        </div>
    );
}
