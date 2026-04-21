import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BulletTracers from "../components/BulletTracers";
import sword from "../assets/sword.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import uniqid from 'uniqid';

function ShineButton({ children }) {
	const [hovered, setHovered] = useState(false);
	return (
		<motion.div
			className="bo-button"
			onHoverStart={() => setHovered(true)}
			onHoverEnd={() => setHovered(false)}
			whileHover={{ filter: "brightness(1.04)", boxShadow: "0 0 16px rgba(242,84,84,0.5)", transition: { duration: 0.3 } }}
			animate={hovered ? { scale: [1.03, 1.037, 1.03] } : { scale: 1 }}
			transition={hovered ? { scale: { duration: 1, repeat: Infinity, ease: "easeInOut" } } : { scale: { duration: 0.2 } }}
			style={{ overflow: "hidden", position: "relative" }}
		>
			{children}
			<motion.div
				initial={{ x: "-150%" }}
				animate={{ x: hovered ? "250%" : "-150%" }}
				transition={hovered ? { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } : { duration: 0 }}
				style={{
					position: "absolute",
					top: 0, left: 0,
					width: "45%",
					height: "100%",
					background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
					pointerEvents: "none",
					skewX: "-15deg",
				}}
			/>
		</motion.div>
	);
}

export default function Landing() {
	return (
		<>
			<BulletTracers />
			<div style={{ position: "relative", zIndex: 1 }}>
			<Navbar />
			<div className="landing-container">
				<h1>
					<span id="red">VALO</span>DRAFT
				</h1>
				<h2>Map Veto Tool for Competitive Valorant</h2>
				<motion.div className="landing-pick-menu" initial={{x: -2000}} animate={{x: 0}} transition={{ type: "spring", bounce: 0.15 }}>
					<div className="landing-menu-container">
						<div className="landing-menu-title">
							<h3>START A VETO</h3>
							<img src={sword} alt="" />
						</div>
						<h4>MATCH FORMAT</h4>
						<div className="landing-menu-buttons">
                        <Link to={`/bo2/${uniqid()}`} style={{ textDecoration: 'none' }}><ShineButton>Best of 2 Series</ShineButton></Link>
                        <Link to={`/bo3/${uniqid()}`} style={{ textDecoration: 'none' }}><ShineButton>Best of 3 Series</ShineButton></Link>
						</div>
					</div>
				</motion.div>
			</div>
			<Footer />
			</div>
		</>
	);
}
