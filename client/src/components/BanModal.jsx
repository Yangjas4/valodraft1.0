import { motion } from "framer-motion";
import ModalCard from "./ModalCard";

const container = {
	hidden: { opacity: 0, y: 28, scale: 0.97 },
	visible: {
		opacity: 1, y: 0, scale: 1,
		transition: {
			duration: 0.3,
			ease: [0.25, 0.46, 0.45, 0.94],
			staggerChildren: 0.05,
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

export default function BanModal(props) {
	const cards = props.mapsRemaining.map((m) => (
		<motion.div key={m} variants={item}>
			<ModalCard map={m} onSelect={props.handleSelect} />
		</motion.div>
	));

	return (
		<motion.div
			className="pick-modal-container"
			variants={container}
			initial="hidden"
			animate="visible"
			exit="exit"
		>
			<motion.div className="pick-modal-text" variants={item}>
				<h1>
					YOUR TURN TO <span id="red">BAN</span>
				</h1>
			</motion.div>
			<div className="pick-modal-maps">{cards}</div>
		</motion.div>
	);
}
