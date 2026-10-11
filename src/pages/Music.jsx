import { useEffect } from "react";
import { tracks } from "../data/tracks.js";
import useAudioPlayer from "../hooks/useAudioPlayer.js";
import TrackCard from "../components/TrackCard.jsx";

export default function Music() {
    const { activeId, playing, time, lengthOf, toggle, seek } = useAudioPlayer(tracks);

    useEffect(() => {
        document.documentElement.classList.add("snap-y");
        return () => document.documentElement.classList.remove("snap-y");
    }, []);

    return (
        <main>
            <div className="intro music-hero">
                <h1>Music</h1>
                <p>A collection of tracks (mostly WIP/demos) I made over time.<br />I'm not very proud of a lot of them, but I think this is a valuable<br />way to see how I've grown. (Listed in no particular order.)</p>
            </div>
            <div className="tracklist">
                {tracks.map((t) => (
                    <TrackCard
                        key={t.id}
                        t={t}
                        active={activeId === t.id}
                        playing={playing}
                        time={activeId === t.id ? time : 0}
                        length={lengthOf(t)}
                        onToggle={toggle}
                        onSeek={seek}
                    />
                ))}
            </div>
        </main>
    );
}