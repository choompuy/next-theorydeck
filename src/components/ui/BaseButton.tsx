import { ReactNode } from "react";
import Link from "next/link";
import styles from "./BaseButton.module.css";

interface Props {
    children: ReactNode;
    label?: string;
    href?: string;
    wFull?: boolean;
    isActive?: boolean;
}

export function BaseButton(props: Props) {
    const className = `${styles.button} flex-row`;
    
    return (
        <div className={`${styles["button-wrapper"]} ${props.wFull && "w-full"} ${props.isActive && styles["is-active"]}`}>
            {props.href ? (
                <Link className={className} href={props.href}>
                    {props.children}
                </Link>
            ) : (
                <button className={className}>{props.children}</button>
            )}
        </div>
    );
}
