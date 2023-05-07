import valodraft from "../assets/valodraft.svg"
import hamburger from "../assets/hamburger.png"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react";
import { Link } from "react-router-dom"

export default function Navbar() {
    
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    function handleHamburger() {
        setHamburgerOpen((prevState) => !prevState);
        console.log(hamburgerOpen);
    }

    return (
        <>
        <nav>
            <Link to={"/"}><motion.img src={valodraft} alt="Valodraft Logo" whileHover={{scale: 1.1}} id="navlogo"/></Link>
            <motion.img src={hamburger} alt="Hamburger Menu" id="hamburger" whileHover={{rotate: 90}} onClick={() => handleHamburger()}/>
        </nav>
        <AnimatePresence>
            {hamburgerOpen && (
            <motion.div className="sidenavbar" initial={{x: 1000}} animate={{x: 0}} exit={{x: 1000}}>
                <motion.p id="x-button" onClick={() => handleHamburger()}>x</motion.p>
                <Link to={"/"} onClick={() => handleHamburger()}>Home</Link> 
                <Link to={"/bo2"} onClick={() => handleHamburger()}>Bo2</Link> 
                <Link to={"/bo3"} onClick={() => handleHamburger()}>Bo3</Link> 
            </motion.div>)}
        </AnimatePresence>
        </>
    )

}