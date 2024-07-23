import { useEffect, useRef, useState } from 'react';

function UseActive(time: number) {

    const [active, setActive] = useState(true);
    const timer = useRef() as any;
    const events = ['keypress', 'mousemove', 'touchmove', 'click', 'scroll'];

    useEffect(() => {

        const handleEvent = () => {
            if (timer.current) {
                window.clearTimeout(timer.current);
            }

            timer.current = window.setTimeout(() => {
                setActive(false);
            }, time);
        };

        events.forEach((eve) => document.addEventListener(eve, handleEvent));

        return () => {
            events.forEach((eve) => document.removeEventListener(eve, handleEvent));
        }

    }, [time]);

    return active;

}

export default UseActive