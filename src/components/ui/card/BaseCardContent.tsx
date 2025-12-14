import { ReactNode } from "react";

export function BaseCardContent({ children }: { children: ReactNode }) {
    return <div className="flex-column gap-s">{children}</div>;
}
