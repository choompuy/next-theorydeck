import styles from "./ConfidenceBar.module.css";

export function ConfidenceBar({ value }: { value: number }) {
    return (
        <div className={`${styles["progress-wrapper"]} flex-column gap-xs`}>
            <span>{value}% confidence</span>
            <div className={styles.progress}>
                <div className={styles.track} style={{ width: `${value}%` }} />
            </div>
        </div>
    );
}
