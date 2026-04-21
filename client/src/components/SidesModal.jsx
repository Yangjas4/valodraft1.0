import { motion } from "framer-motion";

const container = {
	hidden: { opacity: 0, y: 28, scale: 0.97 },
	visible: {
		opacity: 1, y: 0, scale: 1,
		transition: {
			duration: 0.3,
			ease: [0.25, 0.46, 0.45, 0.94],
			staggerChildren: 0.07,
		},
	},
	exit: {
		opacity: 0, y: 14,
		transition: { duration: 0.18, ease: [0.55, 0, 1, 0.45] },
	},
};

const item = {
	hidden: { opacity: 0, y: 14 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function SidesModal(props) {
	const map = props.currentMap.toUpperCase();

	return (
		<motion.div
			className="side-modal-container"
			variants={container}
			initial="hidden"
			animate="visible"
			exit="exit"
		>
			<motion.div className="pick-modal-text" variants={item}>
				<h1>
					PICK STARTING SIDE FOR <span id="lblue">{map}</span>
				</h1>
			</motion.div>
			<motion.div className="side-buttons" variants={item}>
				<motion.div
					className="attack-button"
					whileHover={{ scale: 1.03 }}
					onClick={() => props.handleSelect("attacker")}
				>
					ATTACKER
				</motion.div>
				<motion.div
					className="defence-button"
					whileHover={{ scale: 1.03 }}
					onClick={() => props.handleSelect("defender")}
				>
					DEFENDER
				</motion.div>
			</motion.div>
		</motion.div>
	);
}
