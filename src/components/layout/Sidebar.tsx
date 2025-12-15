"use client";

import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";
import { BaseButton } from "@/components/ui/BaseButton";

import { DashboardIcon } from "@/shared/icons/Dashboard";
import { TheoryIcon } from "@/shared/icons/Theory";
import { PlusIcon } from "@/shared/icons/Plus";
import { ShieldIcon } from "@/shared/icons/Shield";

const NAVS = [
    { label: "Dashboard", href: "/", icon: DashboardIcon },
    { label: "Theories", href: "/theory", icon: TheoryIcon },
    { label: "New theory", href: "/theory/new", icon: PlusIcon },
    { label: "Moderation", href: "/moderation", icon: ShieldIcon },
];

export function Sidebar() {
    const pathname = usePathname();

    function isActiveRoute(pathname: string, href: string) {
        if (href === "/") return pathname === "/";
        return pathname === href;
    }

    return (
        <aside className={`${styles.sidebar} flex-column`}>
            <h2>TheoryDeck</h2>

            <nav className={`${styles.nav} flex-column`}>
                {NAVS.map((val, index) => (
                    <BaseButton key={"nav-" + index} href={val.href} isActive={isActiveRoute(pathname, val.href)} wFull>
                        <val.icon />
                        <span>{val.label}</span>
                    </BaseButton>
                ))}
            </nav>
        </aside>
    );
}
