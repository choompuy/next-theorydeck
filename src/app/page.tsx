import Link from "next/link";

export default async function Home() {
    return (
        <main>
            <h1>TheoryDeck</h1>
            <Link href="/theory">Theory Page</Link>
        </main>
    );
}
