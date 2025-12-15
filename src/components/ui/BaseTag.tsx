import { TheoryStatus } from "@/shared/types/theory.types";
import styles from "./BaseTag.module.css";

interface Props {
    status?: TheoryStatus;
    label: string;
}

export function BaseTag(props: Props) {
    return <span className={`${styles.status} ${props.status ? styles[props.status.toLowerCase()] : ""}`}>{props.label}</span>;
}
