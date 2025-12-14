import { IconProps } from "./icons.types";

export function PlusIcon({ size = 24 }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M7 12h10M12 7v10" />
        </svg>
    );
}
