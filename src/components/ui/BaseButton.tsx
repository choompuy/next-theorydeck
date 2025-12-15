import { ReactNode } from "react";
import Link from "next/link";
import styles from "./BaseButton.module.css";

interface Props {
    children: ReactNode;
    label?: string;
    variant?: "primary" | "secondary" | "icon";
    href?: string;
    wFull?: boolean;
    isActive?: boolean;
    onClick?: () => void;
}

export function BaseButton(props: Props) {
    const className = `${styles.button} ${styles[props.variant || "primary"]} flex-row`;

    return (
        <div className={`${styles["button-wrapper"]} ${props.wFull ? "w-full" : ""} ${props.isActive ? styles["is-active"] : ""}`}>
            {props.href ? (
                <Link className={className} href={props.href}>
                    {props.children}
                </Link>
            ) : (
                <button className={className} onClick={props.onClick}>
                    {props.children}
                </button>
            )}
        </div>
    );
}
