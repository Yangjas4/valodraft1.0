import valodraft from "../assets/valodraft.svg"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react";
import { Link } from "react-router-dom"
import uniqid from "uniqid";

const barVariants = {
    rest: { x: 0 },
    hover: (i) => ({
        x: 6,
        transition: { delay: i * 0.07, duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

function CloseIcon({ onClick }) {
    const [hovered, setHovered] = useState(false);
    const size = 52;
    const pad = 5;
    const armLen = 10;
    const sw = 2;

    const brackets = [
        // top-left
        [{ x1: pad, y1: pad + armLen, x2: pad, y2: pad }, { x1: pad, y1: pad, x2: pad + armLen, y2: pad }],
        // top-right
        [{ x1: size - pad, y1: pad + armLen, x2: size - pad, y2: pad }, { x1: size - pad, y1: pad, x2: size - pad - armLen, y2: pad }],
        // bottom-left
        [{ x1: pad, y1: size - pad - armLen, x2: pad, y2: size - pad }, { x1: pad, y1: size - pad, x2: pad + armLen, y2: size - pad }],
        // bottom-right
        [{ x1: size - pad, y1: size - pad - armLen, x2: size - pad, y2: size - pad }, { x1: size - pad, y1: size - pad, x2: size - pad - armLen, y2: size - pad }],
    ];

    return (
        <motion.div
            onClick={onClick}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            style={{ cursor: "pointer", width: size, height: size, position: "relative", marginLeft: 150, marginTop: 6 }}
        >
            <svg width={size} height={size} style={{ position: "absolute", top: 0, left: 0 }}>
                {brackets.map((corner, ci) =>
                    corner.map((line, li) => (
                        <motion.line
                            key={`${ci}-${li}`}
                            x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                            stroke="white" strokeWidth={sw} strokeLinecap="round"
                            initial={{ opacity: 0, pathLength: 0 }}
                            animate={{ opacity: hovered ? 1 : 0, pathLength: hovered ? 1 : 0 }}
                            transition={{ duration: 0.2, delay: hovered ? ci * 0.05 : 0 }}
                        />
                    ))
                )}
            </svg>
            {[45, -45].map((angle, i) => (
                <motion.span
                    key={i}
                    style={{
                        position: "absolute", top: "50%", left: "50%",
                        width: 28, height: 3, borderRadius: 2, background: "white",
                        transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                    }}
                />
            ))}
        </motion.div>
    );
}

function HamburgerIcon({ onClick }) {
    return (
        <motion.div
            id="hamburger"
            onClick={onClick}
            initial="rest"
            whileHover="hover"
            animate="rest"
            style={{ display: "inline-flex", padding: 24, cursor: "pointer" }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        custom={i}
                        variants={barVariants}
                        style={{ display: "block", width: 38, height: 4, background: "#f25454", borderRadius: 2 }}
                    />
                ))}
            </div>
        </motion.div>
    );
}


export default function Navbar() {

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    function handleHamburger() {
        setHamburgerOpen((prevState) => !prevState);
    }

    return (
        <>
        <nav>
            <Link to={"/"}><motion.img src={valodraft} alt="Valodraft Logo" whileHover={{scale: 1.1}} id="navlogo"/></Link>
            <HamburgerIcon onClick={() => handleHamburger()} />
        </nav>
        <AnimatePresence>
            {hamburgerOpen && (
            <motion.div className="sidenavbar" initial={{x: 1000}} animate={{x: 0}} exit={{x: 1000}}>
                <CloseIcon onClick={() => handleHamburger()} />
                <Link to={"/"} onClick={() => handleHamburger()}>Home</Link>
                <Link to={`/bo2/${uniqid()}`} onClick={() => handleHamburger()}>New Bo2</Link>
                <Link to={`/bo3/${uniqid()}`} onClick={() => handleHamburger()}>New Bo3</Link>
            </motion.div>)}
        </AnimatePresence>
        </>
    )

}