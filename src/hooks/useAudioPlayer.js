import { useCallback, useEffect, useRef, useState } from "react";

// Trimmed playback window for a track, given the real file duration (if known)
function bounds(track, fileDuration) {
    const start = track.start ?? 0;
    const end = Math.min(track.end ?? Infinity, fileDuration ?? Infinity);
    return { start, end, length: Number.isFinite(end) ? Math.max(0, end - start) : null };
}

export default function useAudioPlayer(tracks) {
    const audioRef = useRef(null);
    const activeRef = useRef(null);          // track currently loaded
    const durationsRef = useRef({});         // full-file durations by track id
    const [activeId, setActiveId] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [time, setTime] = useState(0);     // seconds into the trimmed region
    const [durations, setDurations] = useState({});

    // one shared Audio element
    // plus lightweight probes to learn each file's length
    useEffect(() => {
        const a = new Audio();
        a.preload = "metadata";
        audioRef.current = a;

        const saveDuration = (id, d) => {
            durationsRef.current[id] = d;
            setDurations({ ...durationsRef.current });
        };

        const finish = (t) => {
            a.pause();
            a.currentTime = t.start ?? 0;
            setTime(0);
            setPlaying(false);
        };

        const onTimeUpdate = () => {
            const t = activeRef.current;
            if (!t) return;
            const { end } = bounds(t, durationsRef.current[t.id]);
            if (a.currentTime >= end) finish(t);
        };
        const onEnded = () => activeRef.current && finish(activeRef.current);
        const onMeta = () => activeRef.current && saveDuration(activeRef.current.id, a.duration);

        a.addEventListener("timeupdate", onTimeUpdate);
        a.addEventListener("ended", onEnded);
        a.addEventListener("loadedmetadata", onMeta);
        a.addEventListener("play", () => setPlaying(true));
        a.addEventListener("pause", () => setPlaying(false));

        const probes = tracks.map((t) => {
            const p = new Audio();
            p.preload = "metadata";
            p.src = t.src;
            p.addEventListener("loadedmetadata", () => saveDuration(t.id, p.duration));
            return p;
        });
        
        return () => {
            a.pause();
            a.removeAttribute("src");
            a.load();
            probes.forEach((p) => { p.removeAttribute("src"); p.load(); });
        };
    }, [tracks]);

    // smooth clock/slider updates while playing
    useEffect(() => {
        if (!playing) return;
        let raf;
    const tick = () => {
        const a = audioRef.current;
        const t = activeRef.current;
        if (a && t) setTime(Math.max(0, a.currentTime - (t.start ?? 0)));
        raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    }, [playing]);

    // loading (if needed) and playing a track from `offset` seconds
    // into its trimmed region;
    // play() is called synchronously inside the click
    // (so iOS Safari allows it)
    const begin = useCallback((track, offset = 0) => {
        const a = audioRef.current;
        const target = (track.start ?? 0) + offset;
        if (activeRef.current?.id !== track.id) {
            a.pause();                                   // this is what enforces one-at-a-time
            a.src = `${track.src}#t=${target}`;          // media fragment: start at `target`
            activeRef.current = track;
            setActiveId(track.id);
            setTime(offset);
            a.play().catch(() => {});
            a.addEventListener("loadedmetadata", () => {  // safety net if the fragment is ignored
                if (activeRef.current?.id === track.id && Math.abs(a.currentTime - target) > 0.5) {
                a.currentTime = target;
                }
            }, { once: true });
        } else {
            a.currentTime = target;
            a.play().catch(() => {});
        }
    }, []);

    const toggle = useCallback((track) => {
        const a = audioRef.current;
        const isActive = activeRef.current?.id === track.id;
        if (isActive && !a.paused) { a.pause(); return; }
        if (isActive) {
        const { start, end } = bounds(track, durationsRef.current[track.id]);
            if (a.currentTime < start || a.currentTime >= end)
                a.currentTime = start;
            a.play().catch(() => {});
        } else {
            begin(track);
        }
    }, [begin]);

    // fraction is 0..1 across the trimmed region;
    // seeking an inactive track starts it
    const seek = useCallback((track, fraction) => {
        const { start, length } = bounds(track, durationsRef.current[track.id]);
        if (!length) return;
        const offset = Math.min(0.999, Math.max(0, fraction)) * length;
        if (activeRef.current?.id === track.id) {
            audioRef.current.currentTime = start + offset;
            setTime(offset);
        } else {
            begin(track, offset);
        }
    }, [begin]);

    const lengthOf = (track) => bounds(track, durations[track.id]).length;

    return { activeId, playing, time, lengthOf, toggle, seek };
}