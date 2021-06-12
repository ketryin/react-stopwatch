import React, { useState, useRef } from 'react';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

function Stopwatch() {
    const time = useRef(0);
    const currentTimeSubscription = useRef(null);
    const [, setRenderCount] = useState(0);

    const unsubscribeAndClear = () => {
        currentTimeSubscription.current?.unsubscribe();
        currentTimeSubscription.current = null;
    }

    const setTimeAndRender = (next) => {
        time.current = next;
        setRenderCount((prev) => prev + 1);
    };

    const start = () => {
        const start = new Date() - time.current;

        currentTimeSubscription.current = interval(10)
            .pipe(map(_ => new Date() - start))
            .subscribe(setTimeAndRender);
    };

    const stop = () => {
        setTimeAndRender(0);
        unsubscribeAndClear();
    };

    const toggleStartStop = () => {
        if (currentTimeSubscription.current) {
            stop();
        } else {
            start();
        }
    };

    const wait = (e) => {
        const isDoubleClick = e => e.detail === 2;

        if (isDoubleClick(e)) {
            setTimeAndRender(time.current);
            unsubscribeAndClear();
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
                {currentTimeSubscription.current ? "Stop" : time.current ? "Resume" : "Start"}
            </button>
            {time.current ? <button onClick={wait}>Wait</button> : ""}
            {time.current ? <button onClick={reset}>Reset</button> : ""}
        </div>
    );
}

export default Stopwatch;