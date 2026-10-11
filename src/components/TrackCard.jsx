import { useMemo, useRef } from "react";

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
    const cols = t.colors.length > 1 ? t.colors : [t.colors[0], t.colors[0]];
    const value = length ? Math.min(1, time / length) : 0;

    // random particle parameters, generated once per card
    const particles = useMemo(
        () =>
        Array.from({ length: 22 }, (_, i) => ({
            x: `${6 + Math.random() * 88}%`,
            size: 3 + Math.random() * 5,
            dist: 130 + Math.random() * 150,
            dur: 2.6 + Math.random() * 2.4,
            delay: -Math.random() * 5,          // negative: already mid-flight on start
            dir: i % 2 ? 1 : -1,                // alternate up / down
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
            className={`track-wrap ${active ? "active" : ""} ${live ? "live" : ""}`}
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
                    "--x": p.x, "--s": `${p.size}px`, "--dist": `${p.dist}px`,
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
                    <div className="clock">
                        <b>{fmt(time)}</b>
                        <span> / {fmt(length)}</span>
                    </div>
                </div>
                <p className="track-desc">{t.description}</p>

                <Slider value={value} onSeek={(f) => onSeek(t, f)} />

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