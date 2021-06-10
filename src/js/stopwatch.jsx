import React, { useState, useRef } from 'react';

function Stopwatch() {
    const time = useRef(0);
    const running = useRef(null);
    const [, setRenderCount] = useState(0);

    const rerender = () => setRenderCount((prev) => prev + 1);

    const setTime = (next) => (time.current = next);
    const setRunning = (next) => (running.current = next);

    const setTimeAndRender = (next) => {
        setTime(next);
        rerender();
    };

    const start = () => {
        const start = new Date() - time.current;

        setRunning(
            setInterval(() => {
                setTimeAndRender(new Date() - start);
            }, 10)
        );
    };

    const stop = () => {
        clearInterval(running.current);
        setTimeAndRender(0);
        setRunning(null);
    };

    const toggleStartStop = () => {
        if (running.current) {
            stop();
        } else {
            start();
        }
    };

    const wait = (e) => {
        if (e.detail === 2) {
            clearInterval(running.current);
            setTimeAndRender(time.current);
            setRunning(null);
        }
    };

    const reset = () => {
        stop();
        start();
    };

    const formatTime = (time) => {
        return new Date(time * 1000).toISOString().substr(11, 8);
    };

    return (
        <div>
            <h2>{formatTime(time.current)}</h2>

            <button onClick={toggleStartStop}>
                {running.current ? "Stop" : time.current ? "Resume" : "Start"}
            </button>
            {time.current ? <button onClick={wait}>Wait</button> : ""}
            {time.current ? <button onClick={reset}>Reset</button> : ""}
        </div>
    );
}

export default Stopwatch;