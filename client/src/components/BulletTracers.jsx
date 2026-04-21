import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

let nextId = 0;

function createTracer() {
    const fromLeft = Math.random() > 0.5;
    const angle = 0;
    const safeZones = [[0, 330], [480, window.innerHeight]];
    const zone = safeZones[Math.floor(Math.random() * safeZones.length)];
    const y = zone[0] + Math.random() * (zone[1] - zone[0]);
    const length = 180 + Math.random() * 220;
    const duration = 0.1 + Math.random() * 0.5;
    const opacity = 0.25 + Math.random() * 0.45;

    return { id: nextId++, fromLeft, angle, y, length, duration, opacity };
}

function Tracer({ tracer, onDone }) {
    const { fromLeft, angle, y, length, duration, opacity } = tracer;
    const start = fromLeft ? -length - 50 : window.innerWidth + 50;
    const end = fromLeft ? window.innerWidth + 50 : -length - 50;

    return (
        <motion.div
            initial={{ x: start }}
            animate={{ x: end }}
            transition={{ duration, ease: "linear" }}
            onAnimationComplete={onDone}
            style={{ position: "fixed", top: y, left: 0, pointerEvents: "none", zIndex: 0 }}
        >
            <div style={{
                width: length,
                height: 0.75,
                background: fromLeft
                    ? "linear-gradient(to right, transparent, rgba(242,84,84,0.7), rgba(255,220,220,1), rgba(242,84,84,0.4), transparent)"
                    : "linear-gradient(to left, transparent, rgba(242,84,84,0.7), rgba(255,220,220,1), rgba(242,84,84,0.4), transparent)",
                opacity,
                borderRadius: 2,
            }} />
        </motion.div>
    );
}

export default function BulletTracers() {
    const [tracers, setTracers] = useState([]);

    const removeTracer = useCallback((id) => {
        setTracers(prev => prev.filter(t => t.id !== id));
    }, []);

    useEffect(() => {
        function scheduleNext() {
            const delay = 150 + Math.random() * 400;
            return setTimeout(() => {
                const burst = Math.random() > 0.6 ? 3 : Math.random() > 0.3 ? 2 : 1;
                const newTracers = Array.from({ length: burst }, () => createTracer());
                setTracers(prev => [...prev, ...newTracers]);
                scheduleNext();
            }, delay);
        }

        const timer = scheduleNext();
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {tracers.map(t => (
                <Tracer key={t.id} tracer={t} onDone={() => removeTracer(t.id)} />
            ))}
        </>
    );
}
