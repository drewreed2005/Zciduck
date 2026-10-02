import { Link } from "react-router-dom";

export default function Home() {
    return (
        <main className="home">
        <p className="eyebrow">Software Engineer</p>
        <h1>Hi, I'm Drew Reed.</h1>
        <p className="lede">
            I build software and write about what I learn along the way.
        </p>
        <Link className="button" to="/portfolio">View my work →</Link>
        </main>
    );
}