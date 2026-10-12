import { useEffect, useMemo, useRef, useState } from "react";

function fmt(s) {
    if (s == null || !Number.isFinite(s)) return "--:--";
    const m = Math.floor(s / 60);
    return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

function Slider({ value, onSeek }) {
    const ref = useRef(null);
    const fromEvent = (e) => {
        const r = ref.current.getBoundingClientRect();
        return (e.clientX - r.left) / r.width;
    };
    return (
        <div
            ref={ref}
            className="slider"
            role="slider"
            tabIndex={0}
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(value * 100)}
            onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); onSeek(fromEvent(e)); }}
            onPointerMove={(e) => { if (e.currentTarget.hasPointerCapture(e.pointerId)) onSeek(fromEvent(e)); }}
            onKeyDown={(e) => {
                if (e.key === "ArrowRight") onSeek(value + 0.02);
                if (e.key === "ArrowLeft") onSeek(value - 0.02);
            }}
        >
        <div className="slider-fill" style={{ width: `${value * 100}%` }} />
        <div className="slider-thumb" style={{ left: `${value * 100}%` }} />
        </div>
    );
}

export default function TrackCard({ t, active, playing, time, length, onToggle, onSeek }) {
    const live = active && playing;

    // stays true for a moment after pausing so the fade-out can finish
    const [awake, setAwake] = useState(live);
    useEffect(() => {
        if (live) { setAwake(true); return; }
        const id = setTimeout(() => setAwake(false), 1700);   // a little longer than the fade-out
        return () => clearTimeout(id);
    }, [live]);

    const cols = t.colors.length > 1 ? t.colors : [t.colors[0], t.colors[0]];
    const value = length ? Math.min(1, time / length) : 0;

    // random particle parameters, generated once per card
    const particles = useMemo(
        () =>
            Array.from({ length: 40 }, (_, i) => ({
                x: `${4 + Math.random() * 92}%`,
                size: 3 + Math.random() * 5,
                dist: `${16 + Math.random() * 34}vh`,     // was px
                dur: 2.8 + Math.random() * 2.6,
                delay: -Math.random() * 5,
                dir: i % 2 ? 1 : -1,
                color: cols[i % cols.length],
        })),
        [t.id] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const meta = [
        t.status,
        t.genre,
        t.bpm != null && `${t.bpm} BPM`,
        t.key,
        t.daw,
        t.date,
    ].filter(Boolean);

    return (
        <article
            className={`track-wrap ${active ? "active" : ""} ${live ? "live" : ""} ${awake ? "awake" : ""}`}
            style={{
                "--c1": cols[0],
                "--c2": cols[1],
                "--grad": `linear-gradient(90deg, ${cols.join(", ")})`,
            }}
        >
            <div className="emit" aria-hidden="true">
                {particles.map((p, i) => (
                <i
                    key={i}
                    style={{
                    "--x": p.x, "--s": `${p.size}px`, "--dist": p.dist,
                    "--dur": `${p.dur}s`, "--delay": `${p.delay}s`, "--dir": p.dir, "--pc": p.color,
                    }}
                />
                ))}
            </div>

            <div className="track">
                <button
                    className="play"
                    onClick={() => onToggle(t)}
                    aria-label={`${live ? "Pause" : "Play"} ${t.title}`}
                >
                {live ? (
                    <svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
                ) : (
                    <svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M8 4l12 8-12 8z" /></svg>
                )}
                </button>

                <div className="track-main">
                <div className="track-head">
                    <h2>{t.title}</h2>
                </div>
                <p className="track-desc">{t.description}</p>

                <div className="scrub">
                    <span className="time now">{fmt(time)}</span>
                    <Slider value={value} onSeek={(f) => onSeek(t, f)} />
                    <span className="time total">{fmt(length)}</span>
                </div>

                {(meta.length > 0 || t.tags?.length > 0) && (
                    <div className="chips tight">
                        {meta.map((m) => <span key={m} className="chip tech">{m}</span>)}
                        {t.tags?.map((tag) => <span key={tag} className="chip tag">#{tag}</span>)}
                    </div>
                )}
                </div>
            </div>
        </article>
    );
}