import { projects } from "../data/projects.js";
import ProjectSection from "../components/ProjectSection.jsx";

const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date)); // oldest first; swap a/b for newest first

function tally(key) {
    const counts = {};
    projects.forEach((p) => p[key].forEach((s) => (counts[s] = (counts[s] || 0) + 1)));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

function SkillBlock({ title, items }) {
    return (
        <div className="skill-block">
        <h3>{title}</h3>
        <div className="chips">
            {items.map(([name, n]) => (
            <span key={name} className="chip">{name} <small>×{n}</small></span>
            ))}
        </div>
        </div>
    );
}

export default function Portfolio() {
    const resources = sorted.flatMap((p) => p.links.map((l) => ({ ...l, project: p.title })));
    return (
        <main>
            <div className="intro">
                <h1>Project Portfolio</h1>
                <p>Selected projects in order from newest to oldest.</p>
            </div>

            <div className="stack">
                {sorted.map((p, i) => <ProjectSection key={p.id} p={p} index={i} />)}
            </div>

            <section className="plain">
                <h2>Across all projects</h2>
                <SkillBlock title="Technical skills" items={tally("technicalSkills")} />
                <SkillBlock title="Non-technical skills" items={tally("softSkills")} />
            </section>

            <section className="plain">
                <h2>Resources</h2>
                <ul className="resources">
                    {resources.map((r) => (
                    <li key={r.url}>
                        <a href={r.url} target="_blank" rel="noreferrer">{r.label} ↗</a>
                        <span> {r.project}{r.type === "demo" ? " · live" : ""}</span>
                    </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}