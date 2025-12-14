import { ReactNode } from "react";
import styles from "./BaseCard.module.css";

export function BaseCardHeader({ children }: { children: ReactNode }) {
    return <div className={`${styles["card-header"]} text-muted`}>{children}</div>;
}
