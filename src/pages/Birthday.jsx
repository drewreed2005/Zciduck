
import { useRef, useState } from "react";
import confetti from "canvas-confetti";
import "../Birthday.css";


function ridiculousConfetti() {
    const duration = 4500;
    const end = Date.now() + duration;

    // an immediate bizarre dense explosion of this
    confetti({
        particleCount: 350,
        spread: 160,
        startVelocity: 65,
        gravity: 0.8,
        ticks: 350,
        origin: { x: 0.5, y: 0.5 },
        scalar: 1.5,
    });

    // tons of cannons shooting from both sides
    const interval = setInterval(() => {
        const timeLeft = end - Date.now();

        if (timeLeft <= 0) {
            clearInterval(interval);
            return;
        }

        confetti({
            particleCount: 100,
            angle: 60,
            spread: 90,
            startVelocity: 65,
            gravity: 0.85,
            ticks: 300,
            origin: { x: 0, y: 0.65 },
            scalar: 1.3,
        });

        confetti({
            particleCount: 100,
            angle: 120,
            spread: 90,
            startVelocity: 65,
            gravity: 0.85,
            ticks: 300,
            origin: { x: 1, y: 0.65 },
            scalar: 1.3,
        });

        // just a stupid amount of confetti
        confetti({
            particleCount: 120,
            spread: 150,
            startVelocity: 45,
            gravity: 0.65,
            ticks: 300,
            origin: { x: Math.random(), y: 0 },
            scalar: 1.2,
        });
    }, 180);
}


export default function Birthday() {
    const [lit, setLit] = useState([true, true, true]);
    const [opened, setOpened] = useState(false);
    const [secret, setSecret] = useState(false);
    const [giftOpened, setGiftOpened] = useState(false);
    const [tourStarted, setTourStarted] = useState(false);
    const [travelIndex, setTravelIndex] = useState(0);

    const [cakeComplete, setCakeComplete] = useState(false);
    const [tourComplete, setTourComplete] = useState(false);

    const birthdayAudio = useRef(null);
    const travelAudio = useRef(null);
    const secretAudio = useRef(null);

    const travelStops = [
        { name: "Bravoland", image: "/birthday/images/bravoland.jpg" },
        { name: "India", image: "/birthday/images/india.jpg" },
        { name: "A Rush Concert", image: "/birthday/images/ma_rush_background.png" },
        { name: "The Ocean", image: "/birthday/images/the_ocean.jpg" },
        { name: "Costco Carmel Mountain", image: "/birthday/images/costco_carmel_mountain.jpg" }
    ];


    const now = new Date();

    const isBirthday =
    now.getMonth() === 9 && now.getDate() === 18;

    const birthdayStatus = isBirthday ? "100%" : "0%";

    function playOnly(audioToPlay) {
    [
        birthdayAudio.current,
        travelAudio.current,
        secretAudio.current,
    ].forEach((audio) => {
        if (audio) {
        audio.pause();
        audio.currentTime = 0;
        }
    });

    if (audioToPlay) {
        audioToPlay.play().catch((error) => {
        console.warn("Audio playback was blocked:", error);
        });
    }
    }

    const allOut = lit.every((candle) => !candle);

    function blowOut(index) {
        const next = lit.map((value, i) =>
            i === index ? false : value
        );
        setLit(next);

        if (next.every((candle) => !candle)) {
            setCakeComplete(true);
            playOnly(birthdayAudio.current);
            ridiculousConfetti();
        }
    }

    function openPresent() {
        setGiftOpened(true);
        playOnly(travelAudio.current);
        ridiculousConfetti();
    }

    function startTour() {
        setTourStarted(true);
        setTravelIndex(0);
        ridiculousConfetti();
    }

    function nextDestination() {
        if (travelIndex < travelStops.length - 1) {
            setTravelIndex((index) => index + 1);
            confetti({
                particleCount: 60,
                spread: 90,
                origin: { y: 0.7 },
            });
        } else {
            setTourStarted(false);
            setTourComplete(true);
            confetti({
                particleCount: 350,
                spread: 160,
                startVelocity: 60,
                scalar: 1.4,
            });
        }
    }

    function toggleSecret() {
        const next = !secret;
        setSecret(next);

        if (next) {
            playOnly(secretAudio.current);
        } else if (secretAudio.current) {
            secretAudio.current.pause();
            secretAudio.current.currentTime = 0;
        }
    }

    return (
        <main className="birthday">
            <audio
                ref={birthdayAudio}
                src="/birthday/audio/happy-birthday-midi.mp3"
                preload="auto"
            />
            <audio
                ref={travelAudio}
                src="/birthday/audio/take-on-me-instrumental.mp3"
                loop
                preload="auto"
            />
            <audio
                ref={secretAudio}
                src="/birthday/audio/happy-birthday-midi.mp3"
                preload="auto"
            />
            <br />
            <div className="birthday-status">
                MADRE BIRTHDAY PAGE
            </div>

            <p className="eyebrow">ANNOUNCEMENT</p>
            <h1>HAPPY BIRTHDAY</h1>
            <p className="subtitle">
                I was able to add a "Z" to the name of my blog
                thanks to a wealthy benefactor. Now I can make
                real birthday cards on here.
            </p>

            <section className="panel cake-panel">
                <h2>01 / CAKE</h2>
                <p>Blow out the candles with your fingers.</p>

                <div className="cake" aria-label="Birthday cake">
                    <div className="candles">
                        {lit.map((isLit, i) => (
                            <button
                                key={i}
                                className="candle"
                                onClick={() => blowOut(i)}
                                aria-label={`Blow out candle ${i + 1}`}
                                disabled={!isLit}
                            >
                                {isLit ? (
                                    <span className="flame">🔥</span>
                                ) : (
                                    <span className="smoke">·</span>
                                )}
                                <span className="wax" />
                            </button>
                        ))}
                    </div>
                    <div className="cake-top" />
                    <div className="cake-body">Cake Text</div>
                    <div className="cake-plate" />
                </div>

                <p aria-live="polite">
                    {allOut
                        ? "GOOD WORK"
                        : `${lit.filter(Boolean).length} candles remain.`}
                </p>

                {allOut && (
                    <p className="success">
                        Wow. That is so much confetti. I didn't even know I could
                        make that much. This is going to run me bankrupt. No more
                        confetti I'm serious stop
                    </p>
                )}
            </section>

            {cakeComplete && (<section className="panel gift-panel">
                <h2>02 / AUTHORIZED GIFT ACCESS</h2>

                {!opened ? (
                    <>
                    <p>
                        Your birthday present has been encrypted
                        for no reason.
                    </p>
                    <button
                        className="gift-button"
                        onClick={() => setOpened(true)}
                    >
                        DECRYPT YOUR GIFT
                    </button>
                    </>
                ) : !giftOpened ? (
                    <div className="reveal">
                        <p>DECRYPTION SUCCESSFUL. THERE IS A PRESENT HERE.</p>
                        <button
                            className="present-emoji"
                            onClick={openPresent}
                            aria-label="Open your birthday present"
                        >
                            🎁
                        </button>
                        <p>Touch it to open it.</p>
                    </div>
                ) : (
                    <div className="reveal">
                        <h3>Your gift: A trip around the world.</h3>
                        <p>
                            The powers of technology can let you visit about
                            5 places you could only imagine.
                        </p>

                        {!tourStarted ? (
                            <button className="gift-button" onClick={startTour}>
                                TRAVEL AROUND THE WORLD
                            </button>
                        ) : (
                            <div className="travel-game">
                            <h3>{travelStops[travelIndex].name}</h3>

                            <div
                                className="travel-scene"
                                style={{
                                backgroundImage:
                                    `url("${travelStops[travelIndex].image}")`,
                                }}
                            >
                                <img
                                    src="/birthday/images/ma_rush_no_background.png"
                                    alt="You, visiting this destination"
                                />
                            </div>

                            <p>
                                Destination {travelIndex + 1} of {travelStops.length}
                            </p>

                            <button
                                className="gift-button"
                                onClick={nextDestination}
                            >
                                {travelIndex === travelStops.length - 1
                                ? "COMPLETE THE TOUR"
                                : "NEXT DESTINATION →"}
                            </button>
                            </div>
                        )}
                    </div>
                )}
            </section>)}

            {tourComplete && (<section className="panel stats-panel">
                <h2>03 / BIRTHDAY ANALYTICS</h2>
                <div className="stats-grid">
                    <div><strong>{birthdayStatus}</strong><span>chance that it is your birthday today</span></div>
                    <div><strong>50 sumn</strong><span>Years YOUNG :)</span></div>
                    <div><strong>5</strong><span>Places Visited Via Technology</span></div>
                    <div><strong>A few</strong><span>Years Since Birthing Me</span></div>
                </div>
            </section>)}

            {tourComplete && (<button
                className="secret-button"
                onClick={toggleSecret}
            >
                {secret ? "Please stop viewing it" :
                "View classified information"}
            </button>)}

            {secret && (
                <section className="panel secret-panel">
                    <img src="/birthday/images/strange-unusual-animal.png"/>
                    This is a real actual animal on God's beautiful green planet
                </section>
            )}

            <footer>
                IF YOU WERE OLD YOU WOULDN'T BE ABLE TO OPERATE THIS SOFTWARE.
            </footer>
        </main>
    );
}
