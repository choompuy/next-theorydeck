import { IconProps } from "./icons.types";

export function DashboardIcon({ size = 24 }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.521 10.08H6.8a1.507 1.507 0 0 0-1.52 1.494v5.654c.008.831.688 1.5 1.52 1.492H9.52a1.506 1.506 0 0 0 1.519-1.493v-5.653a1.506 1.506 0 0 0-1.519-1.493ZM9.521 4.32H6.8a1.478 1.478 0 0 0-1.52 1.434v.973A1.478 1.478 0 0 0 6.8 8.161H9.52a1.478 1.478 0 0 0 1.519-1.434v-.973A1.478 1.478 0 0 0 9.52 4.32ZM14.479 12.96H17.2a1.506 1.506 0 0 0 1.52-1.493V5.814a1.506 1.506 0 0 0-1.519-1.493H14.48a1.506 1.506 0 0 0-1.519 1.493v5.653a1.506 1.506 0 0 0 1.519 1.494ZM14.479 18.72H17.2a1.479 1.479 0 0 0 1.52-1.433v-.973a1.478 1.478 0 0 0-1.519-1.433H14.48a1.478 1.478 0 0 0-1.519 1.433v.972a1.478 1.478 0 0 0 1.519 1.435Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
