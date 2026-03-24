import React, { useEffect, useRef, useState } from 'react';

const RANDOM_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const getRandomChar = () => RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];

const ScrambleText = ({ text, className, as = 'span', duration = 420, steps = 12 }) => {
    const [displayText, setDisplayText] = useState(text);
    const previousTextRef = useRef(text);

    useEffect(() => {
        const previousText = previousTextRef.current;

        if (text === previousText) {
            setDisplayText(text);
            return;
        }

        let frame = 0;
        const totalFrames = Math.max(steps, 1);
        const totalLength = Math.max(previousText.length, text.length);
        const intervalMs = Math.max(Math.floor(duration / totalFrames), 16);

        const intervalId = window.setInterval(() => {
            frame += 1;
            const progress = frame / totalFrames;
            const revealCount = Math.floor(progress * text.length);

            let nextValue = '';

            for (let i = 0; i < totalLength; i += 1) {
                const targetChar = text[i] ?? '';

                if (!targetChar) {
                    continue;
                }

                if (i < revealCount || targetChar === ' ') {
                    nextValue += targetChar;
                } else {
                    nextValue += getRandomChar();
                }
            }

            setDisplayText(nextValue);

            if (frame >= totalFrames) {
                window.clearInterval(intervalId);
                setDisplayText(text);
                previousTextRef.current = text;
            }
        }, intervalMs);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [duration, steps, text]);

    const Tag = as;
    return <Tag className={className}>{displayText}</Tag>;
};

export default ScrambleText;
