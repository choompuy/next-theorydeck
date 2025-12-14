import { ReactNode } from "react";
import styles from "./BaseCard.module.css";

interface Props {
    children: ReactNode;
    className?: string;
}

export function BaseCard({ children, className }: Props) {
    return <div className={`${styles.card} ${className} flex-column`}>{children}</div>;
}
