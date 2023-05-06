import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import sword from "../assets/sword.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Landing() {
	return (
		<>
			<Navbar />
			<div className="landing-container">
				<h1>
					<span id="red">VALO</span>DRAFT
				</h1>
				<h2>Map Veto Tool for Competitive Valorant</h2>
				<div className="landing-pick-menu">
					<div className="landing-menu-container">
						<div className="landing-menu-title">
							<h3>START A VETO</h3>
							<img src={sword} alt="" />
						</div>
						<h4>MATCH FORMAT</h4>
						<div className="landing-menu-buttons">
                        <Link to={"/bo2"} style={{ textDecoration: 'none' }}><motion.div className="bo-button" whileHover={{scale: 1.03}}>Best of 2 Series</motion.div></Link>
                        <Link to={"/bo3"} style={{ textDecoration: 'none' }}><motion.div className="bo-button" whileHover={{scale: 1.03}}>Best of 3 Series</motion.div></Link>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
