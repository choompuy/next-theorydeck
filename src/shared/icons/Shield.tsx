import { IconProps } from "./icons.types";

export function ShieldIcon({ size = 24 }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path
                stroke="currentColor"
                d="M4 10.575c0-2.878 0-4.317.336-4.8C4.67 5.29 6.007 4.826 8.68 3.9l.51-.177C10.581 3.241 11.278 3 12 3c.721 0 1.418.241 2.81.724l.51.177c2.673.926 4.009 1.39 4.344 1.873.336.484.336 1.923.336 4.801v1.417c0 5.075-3.768 7.537-6.132 8.583-.641.283-.962.425-1.868.425-.906 0-1.227-.142-1.868-.425C7.768 19.529 4 17.067 4 11.992v-1.417Z"
            />
            <path
                stroke="currentColor"
                d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM16 14.5c0 .828 0 1.5-4 1.5s-4-.672-4-1.5S9.79 13 12 13s4 .672 4 1.5Z"
            />
        </svg>
    );
}
