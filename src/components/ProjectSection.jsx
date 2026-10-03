import useInView from "../hooks/useInView.js";

export default function ProjectSection({ p, index }) {
    const [ref, inView] = useInView();
    const bg = p.image ? `url("${encodeURI(p.image)}")` : "none";

    return (
        <section
        ref={ref}
        className={`project ${inView ? "in-view" : ""} ${index % 2 ? "right" : ""}`}
        style={{
            "--bg": bg,
            "--pos": p.position || "center",
            "--focus": p.focus || "70% 30%",
            "--blur": `${p.blur ?? 14}px`,
            zIndex: index,
        }}
        >
        <div className="bg blurred" />
        <div className="bg sharp" />
        <div className="scrim" />

        <div className="panel reveal">
            <time>{p.dateLabel || p.date}</time>
            <h2>{p.title}</h2>
            <p className="summary">{p.summary}</p>
            <ul>{p.details.map((d) => <li key={d}>{d}</li>)}</ul>

            <div className="skills">
            <div>
                <h4>Technical</h4>
                <div className="chips tight">
                {p.technicalSkills.map((s) => <span key={s} className="chip tech">{s}</span>)}
                </div>
            </div>
            <div>
                <h4>Non-technical</h4>
                <div className="chips tight">
                {p.softSkills.map((s) => <span key={s} className="chip soft">{s}</span>)}
                </div>
            </div>
            </div>

            <div className="chips tags">
            {p.tags.map((t) => <span key={t} className="chip tag">#{t}</span>)}
            </div>
            <div className="links">
            {p.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noreferrer">{l.label} ↗</a>
            ))}
            </div>
        </div>
        </section>
    );
}