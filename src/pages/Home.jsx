import { Link } from "react-router-dom";

export default function Home() {
    return (
        <main className="home">
        <p className="eyebrow">Software Engineering Blog</p>
        <h1>Zciduck _</h1>
        <h2>Drew Reed</h2>
        <p className="lede">
            I build software in a range of areas. See what I have to offer below.
        </p>
        <Link className="button" to="/portfolio">View my work →</Link>
        </main>
    );
}