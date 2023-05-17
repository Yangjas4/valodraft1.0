import { motion } from "framer-motion";

export default function SidesModal(props) {
	const map = props.currentMap.toUpperCase();
	return (
		<motion.div
			className="side-modal-container"
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0 }}
		>
			<div className="pick-modal-text">
				<h1>
					PICK STARTING SIDE FOR <span id="lblue">{map}</span>
				</h1>
			</div>
			<div className="side-buttons">
				<motion.div
					className="attack-button"
					whileHover={{ scale: 1.03 }}
				>
					ATTACKER
				</motion.div>
				<motion.div
					className="defence-button"
					whileHover={{ scale: 1.03 }}
				>
					DEFENDER
				</motion.div>
			</div>
		</motion.div>
	);
}
