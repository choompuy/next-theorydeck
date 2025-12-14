import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "@/styles/variables.css";
import "@/styles/base.css";
import "@/styles/utilities.css";
import styles from "./layout.module.css";

import { Sidebar } from "@/components/layout/Sidebar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "TheoryDesk",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <div className={styles.layout}>
                    <Sidebar />
                    <div className={styles.content}>{children}</div>
                </div>
            </body>
        </html>
    );
}
